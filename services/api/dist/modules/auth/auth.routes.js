"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const rate_limit_middleware_1 = require("../../middleware/rate-limit.middleware");
const router = (0, express_1.Router)();
// Sentinel: Custom rate limit middleware to protect authentication endpoints
// Limits each IP to 5 requests per 15 minutes window
const authLimiter = (0, rate_limit_middleware_1.rateLimit)(5, 15 * 60 * 1000);
router.post('/register', authLimiter, auth_controller_1.register);
router.post('/login', authLimiter, auth_controller_1.login);
exports.default = router;
