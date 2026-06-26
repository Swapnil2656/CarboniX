"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateApiKey = void 0;
const crypto_1 = require("crypto");
const prisma_1 = require("../lib/prisma");
const authenticateApiKey = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Missing API Key' });
    }
    const rawKey = authHeader.split(' ')[1];
    const hashedKey = (0, crypto_1.createHash)('sha256').update(rawKey).digest('hex');
    try {
        const apiKeyRecord = await prisma_1.prisma.apiKey.findUnique({
            where: { hashedKey }
        });
        if (!apiKeyRecord || apiKeyRecord.status !== 'ACTIVE') {
            return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or revoked API Key' });
        }
        req.apiKey = apiKeyRecord;
        req.userId = apiKeyRecord.createdBy; // The API key belongs to a specific user
        next();
    }
    catch (error) {
        console.error('API Key Validation Error:', error);
        return res.status(500).json({ success: false, error: 'Internal server error validating API Key' });
    }
};
exports.authenticateApiKey = authenticateApiKey;
