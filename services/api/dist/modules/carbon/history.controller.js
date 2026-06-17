"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = void 0;
const prisma_1 = require("../../lib/prisma");
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await prisma_1.prisma.calculation.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        res.json({ success: true, data: history });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getHistory = getHistory;
