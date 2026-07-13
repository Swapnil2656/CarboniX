import { Router } from 'express';
import { calculate, compare, recommend, calculateEmissions, verifyKey, ingestTelemetry } from './carbon.controller';
import { getHistory, deleteCalculation } from './history.controller';
import { getDashboard } from './dashboard.controller';
import { getNotifications, markNotificationRead } from './notifications.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authenticateApiKey } from '../../middleware/apiKey.middleware';

const router = Router();

import { authenticateHybrid } from '../../middleware/hybrid.middleware';

router.post('/calculate', authenticate, calculate);
router.post('/compare', authenticate, compare);
router.post('/recommend', authenticateHybrid, recommend);

// New endpoint for direct emissions calculation
router.post('/calculate-emissions', calculateEmissions);

// CLI Integration Endpoints
router.post('/verify-key', authenticateApiKey, verifyKey as any);
router.post('/telemetry/ingest', authenticateApiKey, ingestTelemetry as any);

router.get('/history', authenticate, getHistory);
router.delete('/history/:id', authenticate, deleteCalculation);
router.get('/dashboard', authenticate, getDashboard);
router.get('/notifications', authenticate, getNotifications);
router.patch('/notifications/:id/read', authenticate, markNotificationRead);

export default router;
