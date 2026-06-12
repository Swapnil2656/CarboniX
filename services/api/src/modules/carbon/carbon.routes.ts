import { Router } from 'express';
import { calculate, compare, recommend } from './carbon.controller';

const router = Router();

router.post('/calculate', calculate);
router.post('/compare', compare);
router.post('/recommend', recommend);

// Placeholder for history
router.get('/history', (req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
