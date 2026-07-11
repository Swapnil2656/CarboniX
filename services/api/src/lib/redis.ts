import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const globalForRedis = global as unknown as { redisClient: Redis };

export const redis = globalForRedis.redisClient || new Redis(REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  retryStrategy: (times) => {
    if (times > 1) return null; // stop retrying immediately
    return 100; // quick backoff
  }
});

redis.on('error', (err) => {
  console.warn('[REDIS] Connection error:', err.message);
});

if (process.env.NODE_ENV !== 'production') globalForRedis.redisClient = redis;
