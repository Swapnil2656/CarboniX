import { Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { redis } from '../../lib/redis';

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { from, to, provider } = req.query;

    const where: any = { userId };
    
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from as string);
      if (to) where.createdAt.lte = new Date(to as string);
    }
    
    if (provider) {
      where.provider = (provider as string).toUpperCase();
    }

    const cacheKey = `history:${userId}:${JSON.stringify(req.query)}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json({ success: true, data: JSON.parse(cached).data, summary: JSON.parse(cached).summary, cached: true });
    }

    const history = await prisma.calculation.findMany({
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
    const regionCounts: Record<string, number> = {};
    const providerCounts: Record<string, number> = {};

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

    await redis.setex(cacheKey, 60, JSON.stringify({ data: enhancedHistory, summary }));

    res.json({ success: true, data: enhancedHistory, summary });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCalculation = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const calc = await prisma.calculation.findUnique({ where: { id } });
    if (!calc || calc.userId !== userId) {
      return res.status(404).json({ success: false, error: 'Calculation not found' });
    }

    await prisma.calculation.delete({ where: { id } });

    // Invalidate history cache
    const keys = await redis.keys(`history:${userId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    await redis.del(`history:${userId}`);

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
