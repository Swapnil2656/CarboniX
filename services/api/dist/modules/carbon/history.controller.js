"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = void 0;
const prisma_1 = require("../../lib/prisma");
const redis_1 = require("../../lib/redis");
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const cacheKey = `history:${userId}`;
        const cached = await redis_1.redis.get(cacheKey);
        if (cached) {
            return res.json({ success: true, data: JSON.parse(cached), cached: true });
        }
        const history = await prisma_1.prisma.calculation.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        await redis_1.redis.setex(cacheKey, 60, JSON.stringify(history));
        res.json({ success: true, data: history });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getHistory = getHistory;
