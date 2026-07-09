import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import crypto from 'crypto';
import { redis } from '../../lib/redis';
import { sendEmail } from '../../utils/email';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'admin:dashboard_stats';
    let cached = null;
    try {
      cached = await redis.get(cacheKey);
    } catch (e) {
      console.warn('[REDIS] Cache read failed, falling back to DB');
    }
    if (cached) {
      return res.json({ ...JSON.parse(cached), cached: true });
    }

    const apiKeys = await prisma.apiKey.findMany();
    const totalApiCalls = apiKeys.reduce((acc, key) => acc + key.totalRequests, 0);

    const activeSessions = await prisma.session.count({ where: { isActive: true } });
    
    // Average grid intensity across all emission records
    const emissionStats = await prisma.emissionRecord.aggregate({
      _avg: { gridIntensity: true },
    });
    const avgCo2Kg = emissionStats._avg.gridIntensity ? Math.round(emissionStats._avg.gridIntensity) : 0;
    
    const sdkInstalls = await prisma.mobileUser.count();

    // Group emission records by provider
    const providerGroups = await prisma.emissionRecord.groupBy({
      by: ['provider'],
      _count: true,
    });
    const totalRecords = providerGroups.reduce((acc, g) => acc + g._count, 0);
    const providerDistribution = providerGroups.map(g => ({
      provider: g.provider === 'AZURE' ? 'Azure' : g.provider, // map to exact string UI wants
      percent: totalRecords > 0 ? Math.round((g._count / totalRecords) * 100) : 0
    }));

    // Real data for api calls over time using Calculations table
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const calculations = await prisma.calculation.findMany({
      where: { createdAt: { gte: last24Hours } },
      select: { createdAt: true }
    });

    // Group by hour
    const hourlyCounts = new Array(24).fill(0);
    const currentHour = new Date().getHours();
    
    calculations.forEach(calc => {
      const calcHour = calc.createdAt.getHours();
      // Calculate how many hours ago this was (0-23)
      let diff = currentHour - calcHour;
      if (diff < 0) diff += 24;
      if (diff < 24) hourlyCounts[23 - diff]++; // index 23 is current hour
    });

    const apiCallsOverTime = hourlyCounts.map((calls, i) => {
      let h = currentHour - (23 - i);
      if (h < 0) h += 24;
      return {
        hour: `${h}:00`,
        calls: calls
      };
    });

    // We do not currently track individual endpoint hits, so return empty array
    const topEndpoints: any[] = [];

    const responseData = {
      totalApiCalls,
      activeSessions: activeSessions || 125, // fallback if no sessions
      avgCo2Kg,
      sdkInstalls,
      apiCallsOverTime,
      topEndpoints,
      providerDistribution: providerDistribution.length ? providerDistribution : [
        { provider: 'AWS', percent: 45 },
        { provider: 'GCP', percent: 35 },
        { provider: 'Azure', percent: 20 }
      ],
      liveApiStream: []
    };

    try {
      await redis.setex(cacheKey, 30, JSON.stringify(responseData));
    } catch (e) {
      console.warn('[REDIS] Cache write failed');
    }

    res.json(responseData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const users = await prisma.teamMember.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });
    
    const projects = await prisma.project.findMany({ select: { name: true, sdkConnected: true } });
    const connectedProjectNames = new Set(projects.filter(p => p.sdkConnected).map(p => p.name));
    
    let totalEmissions = 0;
    let connectedCount = 0;

    const enrichedUsers = users.map(user => {
      const isConnected = connectedProjectNames.has(user.projectName);
      const co2 = isConnected ? user.co2Emissions : 0;
      
      if (isConnected) {
        totalEmissions += co2;
        connectedCount++;
      }
      
      return {
        ...user,
        co2Emissions: co2
      };
    });

    const fleetAvg = connectedCount > 0 ? Math.round(totalEmissions / connectedCount) : 0;
    
    const total = await prisma.teamMember.count();

    res.json({
      users: enrichedUsers,
      total,
      page,
      pageSize,
      fleetAvg
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeatureFlags = async (req: Request, res: Response) => {
  try {
    const flags = await prisma.featureFlag.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const formattedFlags = flags.map(f => ({
      id: f.id,
      name: f.displayName,
      screen: f.key,
      enabled: f.enabled,
      lastChangedAt: f.lastToggledAt.toISOString(),
      lastChangedBy: f.lastToggledBy || 'System'
    }));

    res.json({ flags: formattedFlags });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleFeatureFlag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { enabled } = req.body;

    const updated = await prisma.featureFlag.update({
      where: { id },
      data: { 
        enabled,
        lastToggledAt: new Date(),
        toggleCount: { increment: 1 }
      }
    });

    res.json({ success: true, flag: updated });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getApiKeys = async (req: Request, res: Response) => {
  try {
    const keys = await prisma.apiKey.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const formattedKeys = keys.map(k => ({
      id: k.id,
      name: k.name,
      maskedKey: k.prefix + '••••••••••••••••••••',
      usageLast24h: k.todayRequests,
      status: k.status,
      createdAt: k.createdAt.toISOString()
    }));

    res.json({ 
      keys: formattedKeys,
      monthlyUsagePercent: 42 // placeholder or could compute from sum / limit
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { name, permissions, expiration } = req.body;
    
    // Generate a random key
    const rawKey = 'cx_' + crypto.randomBytes(32).toString('hex');
    const prefix = rawKey.substring(0, 12);
    const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');
    
    let expiresAt = null;
    if (expiration === '30d') expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    else if (expiration === '90d') expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    else if (expiration === '1y') expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const apiKey = await prisma.apiKey.create({
      data: {
        name,
        prefix,
        hashedKey,
        createdBy: 'admin_user',
        permissions: permissions || ['calculate', 'compare', 'recommend', 'history'],
        expiresAt
      }
    });

    // Return the raw key ONLY ONCE
    res.status(201).json({ key: rawKey, id: apiKey.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const revokeApiKey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.apiKey.update({
      where: { id },
      data: { 
        status: 'REVOKED',
        revokedAt: new Date(),
        revokedBy: 'admin_user'
      }
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const team = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userName: true,
        email: true,
        type: true,
        isVerified: true,
        createdAt: true,
        profile: {
          select: {
            fullName: true,
            avatarUrl: true
          }
        }
      }
    });

    res.json({ team });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const syncTeamMembers = async (req: Request, res: Response) => {
  try {
    const { members, projectName } = req.body;
    
    const synced = [];
    for (const m of members) {
      if (!m.name || !m.email) continue;
      
      const existing = await prisma.teamMember.findFirst({
        where: { name: m.name }
      });
      
      if (!existing) {
        const newMember = await prisma.teamMember.create({
          data: {
            name: m.name,
            email: m.email,
            role: 'Developer',
            projectName: projectName || 'Unknown Project',
            projectId: 'proj_' + Math.random().toString(36).substring(7),
            location: 'Global',
            co2Emissions: Math.floor(Math.random() * 200) + 50,
            status: 'ACTIVE',
            aiSuggestion: `AI Suggestion: Consider optimizing the database queries running in ${projectName || 'your project'} to reduce compute cycles by an estimated 15%.`
          }
        });
        synced.push(newMember);
      } else {
        const updated = await prisma.teamMember.update({
          where: { id: existing.id },
          data: { projectName: projectName || existing.projectName }
        });
        synced.push(updated);
      }
    }
    
    res.json({ success: true, count: synced.length, synced });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const inviteUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, projectName } = req.body;
    
    const inviteLink = `http://localhost:3000/invite?email=${encodeURIComponent(email)}`;
    
    await sendEmail(
      email,
      "You've been invited to CarboniX!",
      `<div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2>Hi ${name || email.split('@')[0]},</h2>
        <p>You have been invited to join the <strong>${projectName}</strong> project on CarboniX as a ${role || 'Developer'}.</p>
        <p>Please click below to accept the invitation and connect your environment:</p>
        <p>
          <a href="${inviteLink}" style="display:inline-block;padding:12px 24px;background:#50FA7B;color:#1e1e2e;text-decoration:none;border-radius:8px;font-weight:600">
            Accept Invitation
          </a>
        </p>
      </div>`
    );

    const newMember = await prisma.teamMember.create({
      data: {
        name: name || email.split('@')[0],
        email: email,
        role: role || 'Developer',
        projectName: projectName || 'Invited',
        projectId: 'proj_invite',
        location: 'Pending',
        co2Emissions: 0,
        status: 'PENDING',
        aiSuggestion: 'User has just been invited. Waiting for them to accept and connect their environment.'
      }
    });

    res.json({ success: true, message: `Invite sent to ${email}`, member: newMember });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.teamMember.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Teammate removed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmissions = async (req: Request, res: Response) => {
  try {
    const provider = req.query.provider as string;
    const region = req.query.region as string;

    const projects = await prisma.project.findMany({ select: { sdkConnected: true } });
    const isSdkConnected = projects.some(p => p.sdkConnected);

    if (!isSdkConnected) {
      return res.json({
        records: [],
        metrics: {
          totalInstances: 0,
          idleInstances: 0,
          oversizedInstances: 0,
          wastedCarbonKg: 0
        },
        isSdkConnected: false
      });
    }

    const where: any = {};
    if (provider && provider !== 'All') {
      where.provider = provider.toUpperCase();
    }
    if (region && region !== 'All') {
      where.region = region;
    }

    const records = await prisma.emissionRecord.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: 500
    });

    const totalInstances = records.length;
    const idleInstances = records.filter(r => r.isIdle).length;
    const oversizedInstances = records.filter(r => r.isOversized).length;
    
    const wastedCarbonKg = records.reduce((sum, r) => {
      if (r.isIdle) return sum + r.carbonKg;
      if (r.isOversized) return sum + (r.carbonKg * 0.5);
      return sum;
    }, 0);

    res.json({
      records,
      metrics: {
        totalInstances,
        idleInstances,
        oversizedInstances,
        wastedCarbonKg
      },
      isSdkConnected: true
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const migrateEmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { targetRegion } = req.body;

    if (!targetRegion) {
      return res.status(400).json({ error: 'Target region is required' });
    }

    // Simulate provisioning delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get the current record
    const record = await prisma.emissionRecord.findUnique({ where: { id } });
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Update the record: new region, lower carbon footprint, and clear oversized/idle flags
    const updatedRecord = await prisma.emissionRecord.update({
      where: { id },
      data: {
        region: targetRegion,
        carbonKg: record.carbonKg * 0.6, // Simulate 40% carbon savings
        isIdle: false,
        isOversized: false,
        recommendation: `Migrated to ${targetRegion}. Operations nominal.`
      }
    });

    res.json({ success: true, record: updatedRecord });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    res.json({ success: true, notifications });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    res.json({ success: true, logs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
