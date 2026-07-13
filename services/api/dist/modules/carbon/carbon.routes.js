"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carbon_controller_1 = require("./carbon.controller");
const history_controller_1 = require("./history.controller");
const dashboard_controller_1 = require("./dashboard.controller");
const notifications_controller_1 = require("./notifications.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const apiKey_middleware_1 = require("../../middleware/apiKey.middleware");
const router = (0, express_1.Router)();
const hybrid_middleware_1 = require("../../middleware/hybrid.middleware");
router.post('/calculate', auth_middleware_1.authenticate, carbon_controller_1.calculate);
router.post('/compare', auth_middleware_1.authenticate, carbon_controller_1.compare);
router.post('/recommend', hybrid_middleware_1.authenticateHybrid, carbon_controller_1.recommend);
// New endpoint for direct emissions calculation
router.post('/calculate-emissions', carbon_controller_1.calculateEmissions);
// CLI Integration Endpoints
router.post('/verify-key', apiKey_middleware_1.authenticateApiKey, carbon_controller_1.verifyKey);
router.post('/telemetry/ingest', apiKey_middleware_1.authenticateApiKey, carbon_controller_1.ingestTelemetry);
router.get('/history', auth_middleware_1.authenticate, history_controller_1.getHistory);
router.delete('/history/:id', auth_middleware_1.authenticate, history_controller_1.deleteCalculation);
router.get('/dashboard', auth_middleware_1.authenticate, dashboard_controller_1.getDashboard);
router.get('/notifications', auth_middleware_1.authenticate, notifications_controller_1.getNotifications);
router.patch('/notifications/:id/read', auth_middleware_1.authenticate, notifications_controller_1.markNotificationRead);
exports.default = router;
