import { Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { logger } from '../../lib/logger';

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const notifications = await prisma.userNotification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    res.json({ success: true, data: notifications });
  } catch (error: any) {
    logger.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const notification = await prisma.userNotification.findUnique({ where: { id } });
    if (!notification || notification.userId !== userId) {
      return res.status(404).json({ success: false, error: 'Notification not found' });
    }

    await prisma.userNotification.update({
      where: { id },
      data: { isRead: true }
    });

    res.json({ success: true });
  } catch (error: any) {
    logger.error('Error marking notification as read:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
