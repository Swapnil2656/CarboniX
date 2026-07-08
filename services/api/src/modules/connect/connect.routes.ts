import { Router } from 'express';
import { handleConnect } from './connect.controller';

const router = Router();

// POST /api/v1/connect/ping
// Called by the CarboniX CLI after `npx @carbonix/cli init --key <key>`
// Validates SDK is properly initialized in the user's project
router.post('/ping', handleConnect);

export default router;
