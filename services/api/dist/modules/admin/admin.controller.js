"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeApiKey = exports.createApiKey = exports.getApiKeys = exports.toggleFeatureFlag = exports.getFeatureFlags = exports.getUsers = exports.getDashboard = void 0;
const prisma_1 = require("../../lib/prisma");
const crypto_1 = __importDefault(require("crypto"));
const redis_1 = require("../../lib/redis");
const getDashboard = async (req, res) => {
    try {
        const cacheKey = 'admin:dashboard_stats';
        const cached = await redis_1.redis.get(cacheKey);
        if (cached) {
            return res.json({ ...JSON.parse(cached), cached: true });
        }
        const apiKeys = await prisma_1.prisma.apiKey.findMany();
        const totalApiCalls = apiKeys.reduce((acc, key) => acc + key.totalRequests, 0);
        const activeSessions = await prisma_1.prisma.session.count({ where: { isActive: true } });
        // Average grid intensity across all emission records
        const emissionStats = await prisma_1.prisma.emissionRecord.aggregate({
            _avg: { gridIntensity: true },
        });
        const avgCo2Kg = emissionStats._avg.gridIntensity ? Math.round(emissionStats._avg.gridIntensity) : 0;
        const sdkInstalls = await prisma_1.prisma.mobileUser.count();
        // Group emission records by provider
        const providerGroups = await prisma_1.prisma.emissionRecord.groupBy({
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
        await redis_1.redis.setex(cacheKey, 30, JSON.stringify(responseData));
        res.json(responseData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDashboard = getDashboard;
const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const users = await prisma_1.prisma.mobileUser.findMany({
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
        const total = await prisma_1.prisma.mobileUser.count();
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUsers = getUsers;
const getFeatureFlags = async (req, res) => {
    try {
        const flags = await prisma_1.prisma.featureFlag.findMany({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getFeatureFlags = getFeatureFlags;
const toggleFeatureFlag = async (req, res) => {
    try {
        const { id } = req.params;
        const { enabled } = req.body;
        const updated = await prisma_1.prisma.featureFlag.update({
            where: { id },
            data: {
                enabled,
                lastToggledAt: new Date(),
                toggleCount: { increment: 1 }
            }
        });
        res.json({ success: true, flag: updated });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.toggleFeatureFlag = toggleFeatureFlag;
const getApiKeys = async (req, res) => {
    try {
        const keys = await prisma_1.prisma.apiKey.findMany({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getApiKeys = getApiKeys;
const createApiKey = async (req, res) => {
    try {
        const { name, permissions, expiration } = req.body;
        // Generate a random key
        const rawKey = 'cx_' + crypto_1.default.randomBytes(32).toString('hex');
        const prefix = rawKey.substring(0, 12);
        const hashedKey = crypto_1.default.createHash('sha256').update(rawKey).digest('hex');
        let expiresAt = null;
        if (expiration === '30d')
            expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        else if (expiration === '90d')
            expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        else if (expiration === '1y')
            expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        const apiKey = await prisma_1.prisma.apiKey.create({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createApiKey = createApiKey;
const revokeApiKey = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.apiKey.update({
            where: { id },
            data: {
                status: 'REVOKED',
                revokedAt: new Date(),
                revokedBy: 'admin_user'
            }
        });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.revokeApiKey = revokeApiKey;
