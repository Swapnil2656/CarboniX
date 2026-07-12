"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCalculation = exports.getHistory = void 0;
const prisma_1 = require("../../lib/prisma");
const redis_1 = require("../../lib/redis");
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { from, to, provider } = req.query;
        const where = { userId };
        if (from || to) {
            where.createdAt = {};
            if (from)
                where.createdAt.gte = new Date(from);
            if (to)
                where.createdAt.lte = new Date(to);
        }
        if (provider) {
            where.provider = provider.toUpperCase();
        }
        const cacheKey = `history:${userId}:${JSON.stringify(req.query)}`;
        const cached = await redis_1.redis.get(cacheKey);
        if (cached) {
            return res.json({ success: true, data: JSON.parse(cached).data, summary: JSON.parse(cached).summary, cached: true });
        }
        const history = await prisma_1.prisma.calculation.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 100
        });
        // Add dayOfYear
        const enhancedHistory = history.map(item => {
            const start = new Date(item.createdAt.getFullYear(), 0, 0);
            const diff = (item.createdAt.getTime() - start.getTime()) + ((start.getTimezoneOffset() - item.createdAt.getTimezoneOffset()) * 60 * 1000);
            const oneDay = 1000 * 60 * 60 * 24;
            const dayOfYear = Math.floor(diff / oneDay);
            return { ...item, dayOfYear };
        });
        // Calculate Summary
        let totalCo2Kg = 0;
        const regionCounts = {};
        const providerCounts = {};
        enhancedHistory.forEach(calc => {
            totalCo2Kg += calc.co2KgMonth;
            regionCounts[calc.region] = (regionCounts[calc.region] || 0) + 1;
            providerCounts[calc.provider] = (providerCounts[calc.provider] || 0) + 1;
        });
        const topRegion = Object.keys(regionCounts).sort((a, b) => regionCounts[b] - regionCounts[a])[0] || null;
        const topProvider = Object.keys(providerCounts).sort((a, b) => providerCounts[b] - providerCounts[a])[0] || null;
        const summary = {
            totalCalculations: enhancedHistory.length,
            totalCo2Kg: Number(totalCo2Kg.toFixed(1)),
            avgCo2Kg: enhancedHistory.length > 0 ? Number((totalCo2Kg / enhancedHistory.length).toFixed(1)) : 0,
            topRegion,
            topProvider
        };
        await redis_1.redis.setex(cacheKey, 60, JSON.stringify({ data: enhancedHistory, summary }));
        res.json({ success: true, data: enhancedHistory, summary });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getHistory = getHistory;
const deleteCalculation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const calc = await prisma_1.prisma.calculation.findUnique({ where: { id } });
        if (!calc || calc.userId !== userId) {
            return res.status(404).json({ success: false, error: 'Calculation not found' });
        }
        await prisma_1.prisma.calculation.delete({ where: { id } });
        // Invalidate history cache
        const keys = await redis_1.redis.keys(`history:${userId}:*`);
        if (keys.length > 0) {
            await redis_1.redis.del(...keys);
        }
        await redis_1.redis.del(`history:${userId}`);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteCalculation = deleteCalculation;
