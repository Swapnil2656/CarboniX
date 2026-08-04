import { Router } from 'express';
import { AgentController } from './agent.controller';
import { authenticateApiKey } from '../../middleware/apiKey.middleware';

const router = Router();
const controller = new AgentController();

// Local agents will use a Bearer token (API Key) to report telemetry
router.post('/report', authenticateApiKey, controller.reportTelemetry.bind(controller));

export default router;
