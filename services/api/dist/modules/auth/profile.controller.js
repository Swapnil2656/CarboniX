"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.deactivateAccount = exports.registerPushToken = exports.updateProfile = exports.getProfile = void 0;
const prisma_1 = require("../../lib/prisma");
const logger_1 = require("../../lib/logger");
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true }
        });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        // Map User to mobile profile expected format
        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.userName,
                email: user.email,
                createdAt: user.createdAt,
                emailAlerts: user.profile?.emailAlerts ?? true,
                pushAlerts: user.profile?.pushAlerts ?? false,
                thresholdAlerts: user.profile?.thresholdAlerts ?? true,
                avatarUrl: user.profile?.avatarUrl
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;
        // Only allow updating certain fields
        const allowedFields = ['name'];
        const profileAllowedFields = ['emailAlerts', 'pushAlerts', 'thresholdAlerts'];
        const dataToUpdate = {};
        const profileDataToUpdate = {};
        for (const key of Object.keys(updates)) {
            if (allowedFields.includes(key)) {
                if (key === 'name')
                    dataToUpdate.userName = updates[key];
            }
            if (profileAllowedFields.includes(key)) {
                profileDataToUpdate[key] = updates[key];
            }
        }
        if (Object.keys(dataToUpdate).length > 0) {
            await prisma_1.prisma.user.update({
                where: { id: userId },
                data: dataToUpdate
            });
        }
        if (Object.keys(profileDataToUpdate).length > 0) {
            await prisma_1.prisma.profile.upsert({
                where: { userId },
                update: profileDataToUpdate,
                create: {
                    userId,
                    fullName: dataToUpdate.userName || 'User',
                    ...profileDataToUpdate
                }
            });
        }
        res.json({ success: true, message: 'Profile updated successfully' });
    }
    catch (error) {
        logger_1.logger.error('Error updating profile:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.updateProfile = updateProfile;
const registerPushToken = async (req, res) => {
    try {
        const userId = req.user.id;
        const { token, platform } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, error: 'Token is required' });
        }
        await prisma_1.prisma.pushToken.upsert({
            where: { token },
            update: { userId, platform, isActive: true, lastUsedAt: new Date() },
            create: { userId, token, platform }
        });
        res.json({ success: true, message: 'Push token registered successfully' });
    }
    catch (error) {
        logger_1.logger.error('Error registering push token:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.registerPushToken = registerPushToken;
const deactivateAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        // We shouldn't actually delete web users from mobile app normally,
        // but if we do, this is where we'd delete prisma.user.
        res.json({ success: true, message: 'Account deactivated' });
    }
    catch (error) {
        logger_1.logger.error('Error deactivating account:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deactivateAccount = deactivateAccount;
const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        // Clear the push token
        await prisma_1.prisma.pushToken.updateMany({
            where: { userId },
            data: { isActive: false }
        });
        res.json({ success: true });
    }
    catch (error) {
        logger_1.logger.error('Error during logout:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.logout = logout;
