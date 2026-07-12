"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationRead = exports.getNotifications = void 0;
const prisma_1 = require("../../lib/prisma");
const logger_1 = require("../../lib/logger");
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await prisma_1.prisma.userNotification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        res.json({ success: true, data: notifications });
    }
    catch (error) {
        logger_1.logger.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getNotifications = getNotifications;
const markNotificationRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const notification = await prisma_1.prisma.userNotification.findUnique({ where: { id } });
        if (!notification || notification.userId !== userId) {
            return res.status(404).json({ success: false, error: 'Notification not found' });
        }
        await prisma_1.prisma.userNotification.update({
            where: { id },
            data: { isRead: true }
        });
        res.json({ success: true });
    }
    catch (error) {
        logger_1.logger.error('Error marking notification as read:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.markNotificationRead = markNotificationRead;
