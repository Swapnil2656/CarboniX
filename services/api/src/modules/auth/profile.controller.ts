import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { logger } from '../../lib/logger';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await prisma.mobileUser.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        defaultProvider: true,
        defaultRegion: true,
        carbonBudgetKg: true,
        carbonAlertThreshold: true,
        notificationsEnabled: true,
        weeklyDigestEnabled: true,
        budgetAlertEnabled: true,
        greenTipsEnabled: true,
        preferredUnit: true,
        theme: true,
        calculationCount: true,
        totalCO2Tracked: true,
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error: any) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const allowedFields = [
      'name', 'avatarUrl', 'defaultProvider', 'defaultRegion', 
      'carbonBudgetKg', 'carbonAlertThreshold', 'notificationsEnabled', 
      'weeklyDigestEnabled', 'budgetAlertEnabled', 'greenTipsEnabled', 
      'preferredUnit', 'theme'
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updatedUser = await prisma.mobileUser.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        defaultProvider: true,
        defaultRegion: true,
        carbonBudgetKg: true,
        carbonAlertThreshold: true,
        notificationsEnabled: true,
        weeklyDigestEnabled: true,
        budgetAlertEnabled: true,
        greenTipsEnabled: true,
        preferredUnit: true,
        theme: true,
        calculationCount: true,
        totalCO2Tracked: true,
      }
    });

    res.json({ success: true, data: updatedUser });
  } catch (error: any) {
    logger.error('Error updating profile:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const registerPushToken = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { token, platform } = req.body;

    if (!token || !platform) {
      return res.status(400).json({ success: false, error: 'Token and platform are required' });
    }

    await prisma.$transaction([
      prisma.pushToken.upsert({
        where: { token },
        update: { userId, platform, isActive: true, lastUsedAt: new Date() },
        create: { userId, token, platform }
      }),
      prisma.mobileUser.update({
        where: { id: userId },
        data: { pushToken: token }
      })
    ]);

    res.json({ success: true });
  } catch (error: any) {
    logger.error('Error registering push token:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Clear the push token
    await prisma.mobileUser.update({
      where: { id: userId },
      data: { pushToken: null }
    });

    // Optionally handle session invalidation if sessions exist
    res.json({ success: true });
  } catch (error: any) {
    logger.error('Error during logout:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
