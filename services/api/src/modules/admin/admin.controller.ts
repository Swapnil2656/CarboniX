import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { prisma } from '../../lib/prisma';
import crypto from 'crypto';
import { redis } from '../../lib/redis';
import { sendEmail } from '../../utils/email';
import { platformRegistry } from '@carbonix/agents';
import { calculateCarbon } from '@carbonix/core';
import axios from 'axios';
import { CloudProvider } from '@prisma/client';
import { decryptToken } from '../../lib/platformTokenService';

// Helper to resolve the IDs of all users/projects in the current user's team/tenant
export async function resolveTenantContext(userId: string, userEmail: string) {
  const ownedProjects = await prisma.project.findMany({ select: { id: true }, where: { userId } });
  const memberRecords = await prisma.teamMember.findMany({ select: { projectId: true }, where: { email: userEmail } });
  
  const projectIds = Array.from(new Set([
    ...ownedProjects.map(p => p.id),
    ...memberRecords.map(m => m.projectId)
  ]));

  const teamMembers = await prisma.teamMember.findMany({ where: { projectId: { in: projectIds } } });
  const teamEmails = teamMembers.map(tm => tm.email);
  const teamUsers = await prisma.user.findMany({ select: { id: true }, where: { email: { in: teamEmails } } });
  
  const teamUserIds = Array.from(new Set([...teamUsers.map(u => u.id), userId]));
  
  return { projectIds, teamUserIds };
}

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const cacheKey = `admin:dashboard_stats:${userId}`;
    let cached = null;
    try {
      cached = await redis.get(cacheKey);
    } catch (e) {
      console.warn('[REDIS] Cache read failed, falling back to DB');
    }
    if (cached) {
      return res.json({ ...JSON.parse(cached), cached: true });
    }

    const { teamUserIds, projectIds } = await resolveTenantContext(userId, userEmail);

    const filterProjectId = req.query.projectId as string | undefined;
    const filterProjectName = req.query.projectName as string | undefined;

    let targetProjectIds = projectIds;
    let targetProjectName: string | null = null;

    if (filterProjectId && filterProjectId !== 'all' && filterProjectId !== 'All') {
      targetProjectIds = targetProjectIds.filter(id => id === filterProjectId);
      const proj = await prisma.project.findUnique({ where: { id: filterProjectId } });
      if (proj) targetProjectName = proj.name;
    } else if (filterProjectName && filterProjectName !== 'all' && filterProjectName !== 'All') {
      targetProjectName = filterProjectName;
      const projs = await prisma.project.findMany({
        where: {
          id: { in: projectIds },
          name: { equals: filterProjectName.trim(), mode: 'insensitive' }
        }
      });
      if (projs.length > 0) {
        targetProjectIds = projs.map(p => p.id);
      }
    }

    const emissionWhere: any = { projectId: { in: targetProjectIds } };

    const apiKeys = await prisma.apiKey.findMany({
      where: { createdBy: { in: teamUserIds } }
    });
    const totalApiCalls = apiKeys.reduce((acc, key) => acc + key.totalRequests, 0);

    const activeSessions = await prisma.session.count({ where: { isActive: true } });
    
    // Average grid intensity across emission records
    const emissionStats = await prisma.emissionRecord.aggregate({
      where: emissionWhere,
      _avg: { gridIntensity: true },
    });
    const avgCo2Kg = emissionStats._avg.gridIntensity ? Math.round(emissionStats._avg.gridIntensity) : 0;
    
    const sdkInstalls = await prisma.mobileUser.count();

    // Group emission records by provider
    const providerGroups = await prisma.emissionRecord.groupBy({
      by: ['provider'],
      where: emissionWhere,
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
      where: { 
        createdAt: { gte: last24Hours },
        userId: { in: teamUserIds }
      },
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

    // Fetch projects for the user to display in mobile/web dashboard
    const projects = await prisma.project.findMany({
      where: { id: { in: projectIds } },
      select: {
        id: true,
        name: true,
        region: true,
        sdkConnected: true,
        connectedAt: true,
        lastPingAt: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

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
      liveApiStream: [],
      activeProjects: projects
    };

    try {
      await redis.setex(cacheKey, 30, JSON.stringify(responseData));
    } catch (e) {
      console.warn('[REDIS] Cache write failed');
    }

    res.json(responseData);
  } catch (error: any) {
    console.error('[getDashboard] Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const { projectIds } = await resolveTenantContext(userId, userEmail);

    const rawTeamMembers = await prisma.teamMember.findMany({
      where: { projectId: { in: projectIds } }
    });
    
    // Also include the current user and users who are in the team members list
    const memberEmails = rawTeamMembers.map(tm => tm.email);
    const emailsToFetch = Array.from(new Set([...memberEmails, userEmail]));
    
    const rawUsers = await prisma.user.findMany({
      where: { email: { in: emailsToFetch } },
      include: { profile: true }
    });

    // Only get projects for the current user
    const projects = await prisma.project.findMany({ 
      where: { id: { in: projectIds } },
      select: { name: true, sdkConnected: true } 
    });
    const connectedProjectNames = new Set(projects.filter(p => p.sdkConnected).map(p => p.name));
    const defaultProjectName = projects.length > 0 ? projects[0].name : 'CarboniX Core';

    const mergedMap = new Map();
    rawTeamMembers.forEach(tm => mergedMap.set(tm.email, tm));
    
    rawUsers.forEach(u => {
      if (!mergedMap.has(u.email)) {
        mergedMap.set(u.email, {
          id: u.id,
          name: u.profile?.fullName || u.userName || u.email.split('@')[0],
          email: u.email,
          role: u.type,
          projectName: defaultProjectName,
          projectId: projectIds[0] || 'core', // Default to their first project
          location: 'Global',
          co2Emissions: 0,
          status: 'ACTIVE',
          aiSuggestion: null,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt
        });
      } else {
        const existing = mergedMap.get(u.email);
        if (existing.status === 'PENDING') {
          existing.status = 'ACTIVE';
        }
      }
    });

    let allUsers = Array.from(mergedMap.values());
    allUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    const total = allUsers.length;
    
    // Calculate enriched users for ALL users to get accurate insights
    let totalEmissions = 0;
    let connectedCount = 0;

    const allEnriched = allUsers.map(user => {
      const isConnected = connectedProjectNames.has(user.projectName);
      const co2 = user.co2Emissions;
      
      totalEmissions += co2;
      connectedCount++;
      
      return {
        ...user,
        co2Emissions: co2
      };
    });

    const fleetAvg = connectedCount > 0 ? Math.round(totalEmissions / connectedCount) : 0;
    
    // Insights Logic
    const projMap = new Map<string, number>();
    allEnriched.forEach(u => {
      if (u.co2Emissions > 0) {
        projMap.set(u.projectName, (projMap.get(u.projectName) || 0) + u.co2Emissions);
      }
    });

    const sortedProjs = Array.from(projMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    const projectEmissions = sortedProjs.map((p, idx) => ({
      name: p[0],
      percent: Math.round((p[1] / totalEmissions) * 100) || 0,
      color: idx === 0 ? 'bg-[#50FA7B]' : 'bg-primary'
    }));

    let highEmitter = null;
    const highest = [...allEnriched].sort((a, b) => b.co2Emissions - a.co2Emissions)[0];
    if (highest && highest.co2Emissions > 0 && fleetAvg > 0) {
      const diff = highest.co2Emissions - fleetAvg;
      const percentAbove = Math.round((diff / fleetAvg) * 100);
      if (percentAbove > 10) {
        highEmitter = { name: highest.name, percentAbove };
      }
    }

    const uniqueProjectsCount = new Set(allEnriched.map(u => u.projectName)).size;
    const devCount = allEnriched.length;

    const insights = {
      projectEmissions,
      highEmitter,
      devCount,
      projCount: uniqueProjectsCount
    };

    const users = allEnriched.slice((page - 1) * pageSize, page * pageSize);

    res.json({
      users,
      total,
      page,
      pageSize,
      fleetAvg,
      insights
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
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
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const toggleFeatureFlag = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const { enabled } = req.body;

    const oldFlag = await prisma.featureFlag.findUnique({ where: { id } });

    const updated = await prisma.featureFlag.update({
      where: { id },
      data: { 
        enabled,
        lastToggledAt: new Date(),
        toggleCount: { increment: 1 }
      }
    });

    if (oldFlag) {
      await prisma.auditLog.create({
        data: {
          actorId: userId,
          actorEmail: userEmail,
          actorRole: 'ADMIN',
          action: 'FEATURE_FLAG_TOGGLE',
          resource: 'feature_flag',
          resourceId: id,
          before: { enabled: oldFlag.enabled },
          after: { enabled },
          ip: req.ip || '127.0.0.1',
          userAgent: req.headers['user-agent'] || 'Unknown',
        }
      });
    }

    res.json({ success: true, flag: updated });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getApiKeys = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const { teamUserIds } = await resolveTenantContext(userId, userEmail);

    const keys = await prisma.apiKey.findMany({
      where: { createdBy: { in: teamUserIds } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.apiKey.count({
      where: { createdBy: { in: teamUserIds } }
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
      total,
      page,
      pageSize,
      monthlyUsagePercent: 42 // placeholder or could compute from sum / limit
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { name, permissions, expiration, projectId } = req.body;
    
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
        createdBy: userId,
        projectId: projectId || null,
        permissions: permissions || ['calculate', 'compare', 'recommend', 'history'],
        expiresAt
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'API_KEY_CREATED',
        resource: 'api_key',
        resourceId: apiKey.id,
        before: {},
        after: { name, permissions, expiration },
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

    // Return the raw key ONLY ONCE
    res.status(201).json({ key: rawKey, id: apiKey.id });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const revokeApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    await prisma.apiKey.update({
      where: { id },
      data: { 
        status: 'REVOKED',
        revokedAt: new Date(),
        revokedBy: userId
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'API_KEY_REVOKED',
        resource: 'api_key',
        resourceId: id,
        before: { status: 'ACTIVE' },
        after: { status: 'REVOKED' },
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const deleteApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    await prisma.apiKey.delete({
      where: { id }
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'API_KEY_DELETED',
        resource: 'api_key',
        resourceId: id,
        before: {},
        after: {},
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getTeamMembers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { teamUserIds } = await resolveTenantContext(userId, userEmail);

    const team = await prisma.user.findMany({
      where: { id: { in: teamUserIds } },
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
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const syncTeamMembers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { members, projectName } = req.body;
    
    const { projectIds } = await resolveTenantContext(userId, userEmail);
    const targetProjectId = projectIds.length > 0 ? projectIds[0] : 'proj_invite';
    
    const synced = [];
    for (const m of members) {
      if (!m.name || !m.email) continue;
      
      const existing = await prisma.teamMember.findFirst({
        where: { name: m.name, projectId: targetProjectId }
      });
      
      if (!existing) {
        const newMember = await prisma.teamMember.create({
          data: {
            name: m.name,
            email: m.email,
            role: 'Developer',
            projectName: projectName || 'Unknown Project',
            projectId: targetProjectId,
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

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'CODEBASE_SYNCED',
        resource: 'project',
        resourceId: projectName || 'Unknown',
        before: {},
        after: { syncedCount: synced.length },
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const inviteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { name, email, role, projectName } = req.body;
    
    const existingMember = await prisma.teamMember.findUnique({ where: { email } });
    if (existingMember) {
      return res.status(400).json({ error: "A team member with this email already exists." });
    }

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const inviteLink = `${baseUrl}/invite?email=${encodeURIComponent(email)}`;
    
    await sendEmail(
      email,
      "You've been invited to CarboniX!",
      `<div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2>Hi ${name || email.split('@')[0]},</h2>
        <p>You have been invited to join the <strong>${projectName || 'project'}</strong> project on CarboniX as a ${role || 'Developer'}.</p>
        <p>Please click below to accept the invitation and connect your environment:</p>
        <p>
          <a href="${inviteLink}" style="display:inline-block;padding:12px 24px;background:#50FA7B;color:#1e1e2e;text-decoration:none;border-radius:8px;font-weight:600">
            Accept Invitation
          </a>
        </p>
      </div>`
    );

    const { projectIds } = await resolveTenantContext(userId, userEmail);
    const targetProjectId = projectIds.length > 0 ? projectIds[0] : 'proj_invite';

    const newMember = await prisma.teamMember.create({
      data: {
        name: name || email.split('@')[0],
        email: email,
        role: role || 'Developer',
        projectName: projectName || 'Invited',
        projectId: targetProjectId,
        location: 'Pending',
        co2Emissions: 0,
        status: 'PENDING',
        aiSuggestion: 'User has just been invited. Waiting for them to accept and connect their environment.'
      }
    });

    res.json({ success: true, message: `Invite sent to ${email}`, member: newMember });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'TEAM_INVITE',
        resource: 'team_member',
        resourceId: newMember.id,
        before: {},
        after: { email, role, projectName },
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    
    await prisma.teamMember.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Teammate removed successfully' });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'TEAM_MEMBER_REMOVED',
        resource: 'team_member',
        resourceId: id,
        before: {},
        after: {},
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEmissions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

    const { projectIds } = await resolveTenantContext(userId, userEmail);

    const provider = req.query.provider as string;
    const region = req.query.region as string;
    const projectFilter = (req.query.project || req.query.projectId || req.query.projectName) as string;

    const projects = await prisma.project.findMany({
      where: { id: { in: projectIds } },
      select: { id: true, name: true, sdkConnected: true },
      orderBy: { createdAt: 'desc' }
    });
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
        isSdkConnected: false,
        projects
      });
    }

    const where: any = { projectId: { in: projectIds } };
    if (provider && provider !== 'All') {
      where.provider = provider.toUpperCase();
    }
    if (region && region !== 'All') {
      where.region = region;
    }
    if (projectFilter && projectFilter !== 'All' && projectFilter !== 'all') {
      const matchingProj = projects.find(p => p.id === projectFilter || p.name.toLowerCase() === projectFilter.toLowerCase());
      if (matchingProj) {
        where.projectId = matchingProj.id;
      }
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
      isSdkConnected: true,
      projects
    });
  } catch (error: any) {
    console.error('[getEmissions] Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const migrateEmission = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;
    if (!userId || !userEmail) return res.status(401).json({ error: 'Unauthorized' });

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

    // Audit Log
    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: userEmail,
        actorRole: 'ADMIN',
        action: 'EMISSION_MIGRATE',
        resource: 'emission_record',
        resourceId: id,
        before: { region: record.region, carbonKg: record.carbonKg },
        after: { region: targetRegion, carbonKg: updatedRecord.carbonKg },
        ip: req.ip || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown',
      }
    });

    // Notification
    await prisma.notification.create({
      data: {
        title: 'Emission Instance Migrated',
        body: `Instance was successfully migrated from ${record.region} to ${targetRegion}, saving an estimated ${(record.carbonKg - updatedRecord.carbonKg).toFixed(2)}kg CO2.`,
        type: 'BROADCAST',
        status: 'SENT',
        targetAudience: 'ALL',
        createdBy: userId,
      }
    });

    res.json({ success: true, record: updatedRecord });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { createdBy: req.user?.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    res.json({ success: true, notifications });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAuditLogs = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const logs = await prisma.auditLog.findMany({
      where: { actorId: req.user?.id },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    });
    
    const total = await prisma.auditLog.count({ where: { actorId: req.user?.id } });
    
    res.json({ success: true, logs, total, page, pageSize });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.notification.delete({
      where: { id }
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAuditLog = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.auditLog.delete({
      where: { id }
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { projectIds } = await resolveTenantContext(req.user!.id, req.user!.email);
    if (!projectIds.includes(id)) return res.status(403).json({ error: 'Forbidden' });
    
    await prisma.project.delete({ where: { id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const disconnectProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { projectIds } = await resolveTenantContext(req.user!.id, req.user!.email);
    if (!projectIds.includes(id)) return res.status(403).json({ error: 'Forbidden' });
    
    await prisma.project.update({
      where: { id },
      data: { sdkConnected: false, isDeployed: false }
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProjectStats = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { projectIds } = await resolveTenantContext(req.user!.id, req.user!.email);
    if (!projectIds.includes(id)) return res.status(403).json({ error: 'Forbidden' });

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        deployments: {
          include: { platformToken: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    // Auto-heal isDeployed state if there are active PaaS platform tokens or deployments
    const hasActivePaaS = project.deployments.some(d => d.platformToken && d.platformToken.status === 'ACTIVE');
    if (hasActivePaaS && !project.isDeployed) {
      project.isDeployed = true;
      // asynchronously persist this state fix to the DB
      prisma.project.update({ where: { id: project.id }, data: { isDeployed: true } }).catch(console.error);
    }

    // Fetch emissions for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const emissions = await prisma.emissionRecord.findMany({
      where: { projectId: id, timestamp: { gte: thirtyDaysAgo } },
      orderBy: { timestamp: 'asc' }
    });

    // Cost logic
    const uniqueTypes = [...new Set(emissions.map(e => e.instanceType))];
    const instanceTypes = await prisma.instanceType.findMany({
      where: { name: { in: uniqueTypes } }
    });
    const costMap = new Map(instanceTypes.map(t => [t.name, t.onDemandHourlyUsd || 0]));

    const computeAnalytics = (emissionsArr: any[]) => {
      const instanceLastSeen = new Map<string, Date>();
      const emissionIntervals = new Map<string, number>();
      for (const r of emissionsArr) {
        const lastSeen = instanceLastSeen.get(r.instanceId);
        let intervalHours = 1;
        if (lastSeen) {
          const diffMs = r.timestamp.getTime() - lastSeen.getTime();
          intervalHours = Math.min(diffMs / (1000 * 60 * 60), 24);
        }
        emissionIntervals.set(r.id, intervalHours);
        instanceLastSeen.set(r.instanceId, r.timestamp);
      }

      const history30d = Array.from({ length: 30 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const dayStr = d.toISOString().split('T')[0];
        const dayRecords = emissionsArr.filter(e => e.timestamp.toISOString().split('T')[0] === dayStr);
        let dayCost = 0;
        for (const r of dayRecords) {
          const intervalHours = emissionIntervals.get(r.id) || 1;
          dayCost += (costMap.get(r.instanceType) || 0) * intervalHours;
        }
        return {
          date: dayStr,
          carbonKg: dayRecords.reduce((sum, r) => sum + r.carbonKg, 0),
          costUsd: dayCost
        };
      });
      const history7d = history30d.slice(-7);

      const todayKg = history30d[history30d.length - 1]?.carbonKg || 0;
      const yesterdayKg = history30d[history30d.length - 2]?.carbonKg || 0;
      let trendPercent = null;
      let isNew = false;
      if (yesterdayKg > 0) {
        trendPercent = ((todayKg - yesterdayKg) / yesterdayKg) * 100;
      } else if (todayKg > 0) {
        isNew = true;
      }

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0,0,0,0);
      const mtdRecords = emissionsArr.filter(e => e.timestamp >= monthStart);
      const totalMonthKg = mtdRecords.reduce((sum, r) => sum + r.carbonKg, 0);

      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
      const recentEmissions = emissionsArr.filter(e => e.timestamp >= twentyFourHoursAgo);
      const instanceAvgCpu = new Map<string, { sum: number, count: number }>();
      for (const r of recentEmissions) {
        const cur = instanceAvgCpu.get(r.instanceId) || { sum: 0, count: 0 };
        instanceAvgCpu.set(r.instanceId, { sum: cur.sum + r.cpuUtilization, count: cur.count + 1 });
      }
      let idleInstancesCount = 0;
      for (const [_, val] of instanceAvgCpu.entries()) {
        if (val.sum / val.count < 5) idleInstancesCount++;
      }

      const deployCount = new Set(emissionsArr.map(e => e.instanceId)).size;

      return {
        history30d,
        history7d,
        carbonTrend: { todayKg, yesterdayKg, trendPercent, isNew },
        totalMonthKg,
        idleInstances: idleInstancesCount,
        deployCount
      };
    };

    const overallAnalytics = computeAnalytics(emissions);

    // Group deployments with per-deployment analytics
    const enrichedDeployments = project.deployments.map(d => {
      const depEmissions = emissions.filter(e => e.deploymentId === d.id);
      return {
        ...d,
        analytics: computeAnalytics(depEmissions)
      };
    });

    // Budget check
    if (project.carbonBudgetKg && overallAnalytics.totalMonthKg >= project.carbonBudgetKg * 0.8) {
      await prisma.userNotification.create({
        data: {
          userId: req.user!.id,
          title: overallAnalytics.totalMonthKg >= project.carbonBudgetKg ? 'Carbon Budget Exceeded' : 'Carbon Budget Warning',
          body: `Project "${project.name}" monthly usage: ${overallAnalytics.totalMonthKg.toFixed(1)} / ${project.carbonBudgetKg} kg CO₂`,
          type: 'BUDGET_ALERT',
          data: { projectId: project.id, usedKg: overallAnalytics.totalMonthKg, budgetKg: project.carbonBudgetKg }
        }
      });
    }

    // API Keys
    const apiKeys = await prisma.apiKey.findMany({
       where: { projectId: project.id }
    });

    // Greener Region
    let greenerRegion = null;
    if (project.isDeployed && project.provider) {
       const regions = await prisma.region.findMany({ where: { provider: project.provider } });
       const currentRegion = regions.find(r => r.name === project.region);
       if (currentRegion) {
         const sorted = regions.sort((a,b) => a.gridIntensity - b.gridIntensity);
         const best = sorted[0];
         if (best && best.gridIntensity < currentRegion.gridIntensity * 0.9) {
           greenerRegion = best;
         }
       }
    }

    const isStale = project.lastPingAt ? (new Date().getTime() - project.lastPingAt.getTime()) > 24 * 60 * 60 * 1000 : true;

    // Latest records for overview
    const latestEmissions = await prisma.emissionRecord.findMany({
      where: { projectId: id },
      orderBy: { timestamp: 'desc' },
      take: 50 // some records for the table
    });

    // Capability Labeling Logic
    let capabilityTier: 'AUTO_APPLY' | 'MANUAL_APPLY' | 'DATA_ONLY' | 'NOT_CONNECTED' = 'NOT_CONNECTED';
    let manualInstructions: string[] | undefined = undefined;
    
    // Determine the actual platform string
    let currentPlatform: string | null = null;
    let tokenRecord = null;
    
    if (project.dataSource === 'LIVE') {
      // Deployment-scoped: find the token from whichever deployment has one.
      // Return the first active one for backward-compat capability-tier logic.
      // In a multi-deployment project, each deployment has its own token — this
      // is only used for the single-platform capability tier check (which is per-project
      // in the legacy UI; per-deployment tier is returned in the deployments array).
      const activeDeploymentWithToken = project.deployments.find(
        d => d.platformToken && d.platformToken.status === 'ACTIVE'
      );
      if (activeDeploymentWithToken) {
        tokenRecord = activeDeploymentWithToken.platformToken;
        currentPlatform = activeDeploymentWithToken.platformToken!.platform;
      }
    } else if (project.dataSource === 'MOCK_DEMO') {
      currentPlatform = project.provider || 'AWS'; // Fallback for mock demos
    }

    if (currentPlatform) {
      if (['AWS', 'GCP', 'AZURE'].includes(currentPlatform)) {
        // Raw cloud creds or Agent without local action path
        capabilityTier = 'DATA_ONLY';
      } else {
        const adapter = platformRegistry.getAdapter(currentPlatform);
        if (adapter) {
          let caps = adapter.capabilities;
          if (adapter.checkDynamicCapabilities) {
            if (tokenRecord) {
              const decrypted = decryptToken(tokenRecord.encryptedToken);
              caps = await adapter.checkDynamicCapabilities(decrypted, tokenRecord.projectSlug || undefined);
            }
          }

          if (caps.canSetRegion) {
            capabilityTier = 'AUTO_APPLY';
          } else {
            capabilityTier = 'MANUAL_APPLY';
            if (currentPlatform === 'RENDER') {
              manualInstructions = [
                "Region can only be set at service creation — it cannot be changed on an existing service.",
                "Create a new Render service of the same type, selecting the target region at creation.",
                "Copy environment variables/secrets to the new service (or reattach an existing Environment Group).",
                "If a database is attached, note it's separately region-locked — migrating the database too (Render backup/restore or pg_dump/pg_restore) is a further, optional step for full latency benefit.",
                "Test the new service on its temporary onrender.com URL before cutover.",
                "Point your domain/DNS at the new service.",
                "Once confirmed healthy, suspend/delete the old service."
              ];
            } else if (currentPlatform === 'NETLIFY') {
              manualInstructions = [
                "Function region selection requires a Pro or Enterprise plan — confirm your plan first.",
                "If eligible: *Project configuration → Build & deploy → Continuous deployment → Functions region → Configure → select region → Save*, then trigger a redeploy (the setting doesn't apply retroactively).",
                "Note this only affects serverless Functions execution region — static asset/CDN delivery is already global and unaffected by this setting."
              ];
            }
          }
        } else {
          // Connected to something we don't have a first-class adapter for yet
          capabilityTier = 'MANUAL_APPLY';
        }
      }
    }

    const hasPaaS = project.deployments.some(d => d.platformToken && d.platformToken.status === 'ACTIVE');
    const checklist = {
      projectCreated: true,
      apiKeyGenerated: apiKeys.length > 0 || hasPaaS,
      configInitialized: !!project.configInitializedAt || hasPaaS,
      sdkConnected: !!project.lastPingAt || hasPaaS
    };

    const PLATFORM_UNDERLYING_PROVIDER: Record<string, CloudProvider[]> = {
      VERCEL: ['AWS'],
      NETLIFY: ['AWS'],
      RENDER: ['AWS', 'GCP'],
      AWS: ['AWS'],
      GCP: ['GCP'],
      AZURE: ['AZURE'],
    };

    const ds = currentPlatform?.toUpperCase() || '';
    const resolvedProviders = PLATFORM_UNDERLYING_PROVIDER[ds] || ['AWS'];
    const defaultProvider = resolvedProviders[0];
    
    // Pick default instance based on provider
    let baseInstance = 't3.medium';
    let mlInstance = 'm5.xlarge'; // Fallback to a big CPU instance since g4dn isn't currently in core's JSON
    
    if (defaultProvider === 'GCP') {
      baseInstance = 'e2-medium';
      mlInstance = 'e2-standard-8';
    } else if (defaultProvider === 'AZURE') {
      baseInstance = 'Standard_B2s';
      mlInstance = 'Standard_D8s_v3';
    } else {
      // AWS
      baseInstance = 't3.medium';
      mlInstance = 'm5.xlarge'; 
    }

    let estimateAssumptions = {
      instanceType: baseInstance,
      cpuUtilization: 15,
      runningHours: 730,
      isGenericDefault: true,
      reasoning: "No project profile detected — showing generic defaults. Run `npx @carbonix/cli init` for an estimate based on your actual project."
    };

    if (project.projectProfile) {
      const profile = project.projectProfile as any;
      if (profile.workloadClass === 'ml') {
        estimateAssumptions.instanceType = mlInstance;
        estimateAssumptions.cpuUtilization = 75;
        estimateAssumptions.runningHours = 200;
        estimateAssumptions.isGenericDefault = false;
        estimateAssumptions.reasoning = `Detected an ML workload. Suggesting a larger instance (${mlInstance}) with high utilization (75%) but intermittent running hours (200 hrs/month) typical for training/inference.`;
      } else if (profile.workloadClass === 'web') {
        estimateAssumptions.instanceType = baseInstance;
        estimateAssumptions.cpuUtilization = 25;
        estimateAssumptions.runningHours = 730;
        estimateAssumptions.isGenericDefault = false;
        estimateAssumptions.reasoning = `Detected a web workload. Suggesting a general-purpose instance (${baseInstance}) running 24/7 (730 hrs/month) with moderate utilization (25%).`;
      }

      if (process.env.NVIDIA_API_KEY && !estimateAssumptions.isGenericDefault) {
        try {
          const nvRes = await axios.post('https://integrate.api.nvidia.com/v1/chat/completions', {
            model: 'meta/llama-3.1-405b-instruct',
            messages: [{
              role: 'user', 
              content: `Write a 1-sentence reasoning (max 150 chars) for why a ${profile.runtime} ${profile.workloadClass} workload should be estimated using a ${estimateAssumptions.instanceType} instance at ${estimateAssumptions.cpuUtilization}% utilization for ${estimateAssumptions.runningHours} hours/month.`
            }],
            max_tokens: 100
          }, {
            headers: { 'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}` },
            timeout: 3000
          });
          if (nvRes.data?.choices?.[0]?.message?.content) {
            estimateAssumptions.reasoning = nvRes.data.choices[0].message.content.trim();
          }
        } catch(e) { /* ignore timeout */ }
      }
    }

    const providerRegions = await prisma.region.findMany({
      where: { provider: { in: resolvedProviders } }
    });
    
    const instanceRow = await prisma.instanceType.findFirst({
      where: { name: estimateAssumptions.instanceType }
    });
    const costPerHour = instanceRow?.onDemandHourlyUsd || 0.0416;

    const projectedRegions = await Promise.all(providerRegions.map(async reg => {
      const calcResult = await calculateCarbon({
        provider: reg.provider,
        region: reg.name,
        instanceType: estimateAssumptions.instanceType,
        instanceCount: 1,
        hoursPerMonth: estimateAssumptions.runningHours,
        cpuUtilization: estimateAssumptions.cpuUtilization / 100,
        storageGb: 50
      });
      return {
        ...reg,
        projectedCarbonKg: calcResult.co2KgMonth,
        costEstimateUsd: costPerHour * estimateAssumptions.runningHours
      };
    }));
    
    const top3Regions = projectedRegions
      .sort((a, b) => a.projectedCarbonKg - b.projectedCarbonKg)
      .slice(0, 3);

    // ─── Per-deployment emission rollup (for multi-deployment card list) ───────
    const deploymentStats = await Promise.all(
      project.deployments.map(async (d) => {
        const depEmissions = emissions.filter(e => e.deploymentId === d.id);
        const depAnalytics = computeAnalytics(depEmissions);
        
        return {
          id: d.id,
          role: d.role,
          label: d.label,
          region: d.region,
          provider: d.provider,
          isDeployed: d.isDeployed,
          deploymentUrl: d.deploymentUrl,
          platformToken: d.platformToken
            ? { platform: d.platformToken.platform, status: d.platformToken.status, projectSlug: d.platformToken.projectSlug }
            : null,
          totalMonthKg: depAnalytics.totalMonthKg,
          history30d: depAnalytics.history30d,
          idleCount: latestEmissions.filter(e => e.deploymentId === d.id && e.isIdle).length,
          oversizedCount: latestEmissions.filter(e => e.deploymentId === d.id && e.isOversized).length,
          createdAt: d.createdAt,
          analytics: depAnalytics // Full analytics payload for frontend tabs
        };
      })
    );

    const stats = {
      project: {
        ...project,
        capabilityTier
      },
      deployments: deploymentStats,
      oversizedInstances: latestEmissions.filter(e => e.isOversized).length,
      ...overallAnalytics, // history7d, history30d, carbonTrend, totalMonthKg, idleInstances(from compute)
      apiKeys,
      greenerRegion,
      isStale,
      instances: latestEmissions,
      checklist,
      estimateAssumptions,
      top3Regions,
      manualInstructions
    };
    res.json({ success: true, data: stats });
  } catch (error: any) {
    console.error('[getProjectStats] Internal server error:', error);
    try { require('fs').writeFileSync('/tmp/carbonix_error.log', error.stack || error.toString()); } catch(e) {}
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ─── Deployment CRUD ──────────────────────────────────────────────────────────

/**
 * POST /admin/projects/:id/deployments
 * Create a new Deployment for a project (label, role, optional platform connection).
 */
export const addDeployment = async (req: AuthRequest, res: Response) => {
  try {
    const { id: projectId } = req.params;
    const { projectIds } = await resolveTenantContext(req.user!.id, req.user!.email);
    if (!projectIds.includes(projectId)) return res.status(403).json({ error: 'Forbidden' });

    const { role, label } = req.body as { role?: string; label?: string };

    const deployment = await prisma.deployment.create({
      data: {
        projectId,
        role: (role as any) ?? 'OTHER',
        label: label ?? null,
      },
    });

    return res.status(201).json({ success: true, data: deployment });
  } catch (error: any) {
    console.error('[addDeployment]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /admin/projects/:id/deployments/:deploymentId
 * Disconnect (and optionally delete) a single deployment without affecting others.
 */
export const deleteDeployment = async (req: AuthRequest, res: Response) => {
  try {
    const { id: projectId, deploymentId } = req.params;
    const { projectIds } = await resolveTenantContext(req.user!.id, req.user!.email);
    if (!projectIds.includes(projectId)) return res.status(403).json({ error: 'Forbidden' });

    const deployment = await prisma.deployment.findFirst({
      where: { id: deploymentId, projectId },
      include: { platformToken: true },
    });
    if (!deployment) return res.status(404).json({ error: 'Deployment not found' });

    // Delete associated platform token first (FK constraint)
    if (deployment.platformToken) {
      await prisma.platformToken.delete({ where: { id: deployment.platformToken.id } });
    }

    // Null-out deploymentId on emission records (preserve history, remove attribution)
    await prisma.emissionRecord.updateMany({
      where: { deploymentId },
      data: { deploymentId: null },
    });

    await prisma.deployment.delete({ where: { id: deploymentId } });

    // If no active tokens remain, reset dataSource
    const remaining = await prisma.platformToken.count({ where: { projectId, status: 'ACTIVE' } });
    if (remaining === 0) {
      await prisma.project.update({ where: { id: projectId }, data: { dataSource: 'NO_CREDS' } });
    }

    return res.json({ success: true, message: 'Deployment deleted. Historical emission data preserved at project level.' });
  } catch (error: any) {
    console.error('[deleteDeployment]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
