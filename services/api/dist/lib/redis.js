"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const globalForRedis = global;
exports.redis = globalForRedis.redisClient || new ioredis_1.default(REDIS_URL, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: (times) => {
        if (times > 1)
            return null; // stop retrying immediately
        return 100; // quick backoff
    }
});
exports.redis.on('error', (err) => {
    console.warn('[REDIS] Connection error:', err.message);
});
if (process.env.NODE_ENV !== 'production')
    globalForRedis.redisClient = exports.redis;
