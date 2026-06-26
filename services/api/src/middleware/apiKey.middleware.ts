import { Request, Response, NextFunction } from 'express';
import { createHash } from 'crypto';
import { prisma } from '../lib/prisma';

export interface ApiKeyRequest extends Request {
  apiKey?: any;
  userId?: string;
}

export const authenticateApiKey = async (req: ApiKeyRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing API Key' });
  }

  const rawKey = authHeader.split(' ')[1];
  const hashedKey = createHash('sha256').update(rawKey).digest('hex');

  try {
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { hashedKey }
    });

    if (!apiKeyRecord || apiKeyRecord.status !== 'ACTIVE') {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or revoked API Key' });
    }

    req.apiKey = apiKeyRecord;
    req.userId = apiKeyRecord.createdBy; // The API key belongs to a specific user
    next();
  } catch (error) {
    console.error('API Key Validation Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error validating API Key' });
  }
};
