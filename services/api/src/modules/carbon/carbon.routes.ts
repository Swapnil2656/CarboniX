import { Router } from 'express';
import { calculate, compare, recommend, calculateEmissions } from './carbon.controller';
import { getHistory } from './history.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/calculate', authenticate, calculate);
router.post('/compare', authenticate, compare);
router.post('/recommend', authenticate, recommend);

// New endpoint for direct emissions calculation
router.post('/calculate-emissions', calculateEmissions);

router.get('/history', authenticate, getHistory);

export default router;
