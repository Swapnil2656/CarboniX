import { Router } from 'express';
import { login, register } from './auth.controller';
import { rateLimit } from '../../middleware/rate-limit.middleware';

const router = Router();
const authLimiter = rateLimit(5, 15 * 60 * 1000);

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

export default router;
