/**
 * CarboniX Agent Routes
 * 
 * REST API endpoints for the Agentic System.
 */

import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import {
  listAgentRuns,
  getAgentRun,
  triggerCollector,
  triggerAnalyst,
  runGate,
  triggerReporter,
  getEmissions,
  getLatestBRSR,
} from './agents.controller';

const router = Router();

// Feed & History
router.get('/runs', authenticate, listAgentRuns);
router.get('/runs/:id', authenticate, getAgentRun);

// Manual Triggers
router.post('/trigger/collector', authenticate, triggerCollector);
router.post('/trigger/analyst', authenticate, triggerAnalyst);
router.post('/trigger/reporter', authenticate, triggerReporter);

// CI/CD Gate (can be called without JWT — uses API key in production)
router.post('/gate', runGate);

// Data endpoints
router.get('/emissions', authenticate, getEmissions);
router.get('/report/brsr', authenticate, getLatestBRSR);

export default router;
