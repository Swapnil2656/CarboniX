import { Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { redis } from '../../lib/redis';

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const cacheKey = `history:${userId}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json({ success: true, data: JSON.parse(cached), cached: true });
    }

    const history = await prisma.calculation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    await redis.setex(cacheKey, 60, JSON.stringify(history));

    res.json({ success: true, data: history });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
