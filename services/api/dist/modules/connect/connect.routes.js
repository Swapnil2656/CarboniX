"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connect_controller_1 = require("./connect.controller");
const router = (0, express_1.Router)();
// POST /api/v1/connect/ping
// Called by the CarboniX CLI after `npx @carbonix/cli init --key <key>`
// Validates SDK is properly initialized in the user's project
router.post('/ping', connect_controller_1.handleConnect);
exports.default = router;
