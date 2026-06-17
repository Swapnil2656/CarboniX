import { Request, Response, NextFunction } from 'express';

// Sentinel: In-memory store for rate limiting to avoid external dependencies
// Using a basic Token Bucket / Fixed Window approach
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (maxRequests: number, windowMs: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';
    const now = Date.now();

    // Clean up expired entries occasionally
    if (Math.random() < 0.01) {
      for (const [key, value] of rateLimitStore.entries()) {
        if (value.resetTime < now) {
          rateLimitStore.delete(key);
        }
      }
    }

    const record = rateLimitStore.get(ip);

    if (!record || record.resetTime < now) {
      // First request or window expired
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      next();
    } else if (record.count < maxRequests) {
      // Within limits
      record.count += 1;
      next();
    } else {
      // Rate limit exceeded
      res.status(429).json({
        success: false,
        error: `Too many requests from this IP, please try again later.`
      });
    }
  };
};
