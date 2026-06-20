import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import crypto from 'crypto';

export const getDashboard = async (req: Request, res: Response) => {
  try {
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

    // Dummy data for over time and top endpoints
    const apiCallsOverTime = Array.from({ length: 24 }).map((_, i) => ({
      hour: `${i}:00`,
      calls: Math.floor(Math.random() * 5000) + 1000
    }));

    const topEndpoints = [
      { path: '/v1/carbon/calculate', calls: 45210 },
      { path: '/v1/agents/runs', calls: 12450 },
      { path: '/v1/reference/regions', calls: 8900 },
      { path: '/v1/users/profile', calls: 5200 },
      { path: '/v1/auth/session', calls: 3100 },
    ];

    res.json({
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
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    const users = await prisma.mobileUser.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { lastActiveAt: 'desc' },
      include: {
        calculations: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });
    
    const total = await prisma.mobileUser.count();

    const formattedUsers = users.map(u => ({
      id: u.id,
      deviceId: u.deviceId || 'Unknown Device',
      email: u.email,
      country: u.country || 'US',
      countryCode: u.country || 'US',
      cloud: u.defaultProvider === 'AZURE' ? 'Azure' : (u.defaultProvider || 'AWS'),
      region: u.calculations[0]?.region || 'us-east-1',
      avgCo2KgPerHour: u.calculations[0]?.co2GramsHour ? u.calculations[0].co2GramsHour / 1000 : 0,
      calculationsOps: u.calculationCount.toString(),
      lastActive: u.lastActiveAt.toISOString(),
      status: u.status
    }));

    res.json({
      users: formattedUsers,
      total,
      page,
      pageSize
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
