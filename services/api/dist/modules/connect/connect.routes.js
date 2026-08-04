"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connect_controller_1 = require("./connect.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// POST /api/v1/connect/ping
// Called by the CarboniX CLI after `npx @carbonix/cli init --key <key>`
// Validates SDK is properly initialized in the user's project
router.post('/ping', connect_controller_1.handleConnect);
// POST /api/v1/connect/platform-token
// Connect a real platform account (Vercel, Netlify, Railway, Render).
// Verifies the token before saving. Sets project.dataSource = LIVE.
router.post('/platform-token', auth_middleware_1.authenticate, connect_controller_1.handleConnectPlatformToken);
// DELETE /api/v1/connect/platform-token/:platform
// Revoke/remove a connected platform token. Resets dataSource to NO_CREDS if no tokens remain.
router.delete('/platform-token/:platform', auth_middleware_1.authenticate, connect_controller_1.handleRevokePlatformToken);
// GET /api/v1/connect/platforms
// Fetch the list of dynamically available platform integrations (Tier 1 & Tier 2)
router.get('/platforms', auth_middleware_1.authenticate, connect_controller_1.handleGetPlatforms);
exports.default = router;
