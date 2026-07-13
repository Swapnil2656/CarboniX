import { Router } from 'express';
import { login, register, subscribe } from './auth.controller';
import { getProfile, updateProfile, registerPushToken, logout } from './profile.controller';
import { rateLimit } from '../../middleware/rate-limit.middleware';
import { authenticate } from '../../middleware/auth.middleware';
const router = Router();
const authLimiter = rateLimit(100, 15 * 60 * 1000);

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/subscribe', subscribe);

// Profile and session routes
router.get('/me', authenticate, getProfile);
router.patch('/me', authenticate, updateProfile);
router.post('/push-token', authenticate, registerPushToken);
router.post('/logout', authenticate, logout);

export default router;
