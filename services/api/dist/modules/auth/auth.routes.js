"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const profile_controller_1 = require("./profile.controller");
const rate_limit_middleware_1 = require("../../middleware/rate-limit.middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
const authLimiter = (0, rate_limit_middleware_1.rateLimit)(5, 15 * 60 * 1000);
router.post('/register', authLimiter, auth_controller_1.register);
router.post('/login', authLimiter, auth_controller_1.login);
router.post('/subscribe', auth_controller_1.subscribe);
// Profile and session routes
router.get('/me', auth_middleware_1.authenticate, profile_controller_1.getProfile);
router.patch('/me', auth_middleware_1.authenticate, profile_controller_1.updateProfile);
router.post('/push-token', auth_middleware_1.authenticate, profile_controller_1.registerPushToken);
router.post('/logout', auth_middleware_1.authenticate, profile_controller_1.logout);
exports.default = router;
