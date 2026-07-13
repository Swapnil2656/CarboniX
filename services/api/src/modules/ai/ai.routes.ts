import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import * as aiController from './ai.controller';

const router = Router();

router.use(authenticate);

router.get('/history', aiController.getHistory);
router.delete('/history', aiController.clearHistory);
router.post('/chat', aiController.chat);

export default router;
