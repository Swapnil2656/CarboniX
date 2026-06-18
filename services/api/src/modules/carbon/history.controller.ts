import { Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const history = await prisma.calculation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    res.json({ success: true, data: history });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
