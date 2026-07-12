"use strict";
/**
 * CarboniX Agent Routes
 *
 * REST API endpoints for the Agentic System.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const agents_controller_1 = require("./agents.controller");
const router = (0, express_1.Router)();
// Feed & History
router.get('/runs', auth_middleware_1.authenticate, agents_controller_1.listAgentRuns);
router.get('/runs/:id', auth_middleware_1.authenticate, agents_controller_1.getAgentRun);
// Manual Triggers
router.post('/trigger/collector', auth_middleware_1.authenticate, agents_controller_1.triggerCollector);
router.post('/trigger/analyst', auth_middleware_1.authenticate, agents_controller_1.triggerAnalyst);
router.post('/trigger/reporter', auth_middleware_1.authenticate, agents_controller_1.triggerReporter);
router.post('/trigger/orchestrator', auth_middleware_1.authenticate, agents_controller_1.triggerOrchestrator);
// CI/CD Gate (can be called without JWT — uses API key in production)
router.post('/gate', agents_controller_1.runGate);
// Data endpoints
router.get('/emissions', auth_middleware_1.authenticate, agents_controller_1.getEmissions);
router.get('/report/brsr', auth_middleware_1.authenticate, agents_controller_1.getLatestBRSR);
exports.default = router;
