import { Request, Response, NextFunction } from 'express';
import { authenticate } from './auth.middleware';
import { authenticateApiKey } from './apiKey.middleware';

export const authenticateHybrid = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];
  
  // If it starts with cx_ it's definitely an API key
  if (token.startsWith('cx_')) {
    return authenticateApiKey(req, res, next);
  } else {
    // Otherwise it might be a JWT or a mock token
    // We can just call authenticate which handles JWTs
    return authenticate(req, res, next);
  }
};
