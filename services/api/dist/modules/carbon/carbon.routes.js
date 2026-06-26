"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carbon_controller_1 = require("./carbon.controller");
const history_controller_1 = require("./history.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const apiKey_middleware_1 = require("../../middleware/apiKey.middleware");
const router = (0, express_1.Router)();
router.post('/calculate', auth_middleware_1.authenticate, carbon_controller_1.calculate);
router.post('/compare', auth_middleware_1.authenticate, carbon_controller_1.compare);
router.post('/recommend', auth_middleware_1.authenticate, carbon_controller_1.recommend);
// New endpoint for direct emissions calculation
router.post('/calculate-emissions', carbon_controller_1.calculateEmissions);
// CLI Integration Endpoints
router.post('/verify-key', apiKey_middleware_1.authenticateApiKey, carbon_controller_1.verifyKey);
router.post('/telemetry/ingest', apiKey_middleware_1.authenticateApiKey, carbon_controller_1.ingestTelemetry);
router.get('/history', auth_middleware_1.authenticate, history_controller_1.getHistory);
exports.default = router;
