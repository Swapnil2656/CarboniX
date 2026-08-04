import { Router } from 'express';
import { handleConnect, handleConnectPlatformToken, handleRevokePlatformToken, handleGetPlatforms } from './connect.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// POST /api/v1/connect/ping
// Called by the CarboniX CLI after `npx @carbonix/cli init --key <key>`
// Validates SDK is properly initialized in the user's project
router.post('/ping', handleConnect);

// POST /api/v1/connect/platform-token
// Connect a real platform account (Vercel, Netlify, Railway, Render).
// Verifies the token before saving. Sets project.dataSource = LIVE.
router.post('/platform-token', authenticate, handleConnectPlatformToken);

// DELETE /api/v1/connect/platform-token/:platform
// Revoke/remove a connected platform token. Resets dataSource to NO_CREDS if no tokens remain.
router.delete('/platform-token/:platform', authenticate, handleRevokePlatformToken);

// GET /api/v1/connect/platforms
// Fetch the list of dynamically available platform integrations (Tier 1 & Tier 2)
router.get('/platforms', authenticate, handleGetPlatforms);

export default router;
