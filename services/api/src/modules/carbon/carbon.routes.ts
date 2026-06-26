import { Router } from 'express';
import { calculate, compare, recommend, calculateEmissions, verifyKey, ingestTelemetry } from './carbon.controller';
import { getHistory } from './history.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authenticateApiKey } from '../../middleware/apiKey.middleware';

const router = Router();

router.post('/calculate', authenticate, calculate);
router.post('/compare', authenticate, compare);
router.post('/recommend', authenticate, recommend);

// New endpoint for direct emissions calculation
router.post('/calculate-emissions', calculateEmissions);

// CLI Integration Endpoints
router.post('/verify-key', authenticateApiKey, verifyKey as any);
router.post('/telemetry/ingest', authenticateApiKey, ingestTelemetry as any);

router.get('/history', authenticate, getHistory);

export default router;
