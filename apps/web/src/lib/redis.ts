import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const globalForRedis = global as unknown as { redisClient: Redis };

export const redis = globalForRedis.redisClient || new Redis(REDIS_URL, {
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  retryStrategy(times) {
    if (times > 1) return null; // stop retrying immediately
    return 100; // quick backoff
  }
});

if (process.env.NODE_ENV !== 'production') globalForRedis.redisClient = redis;
