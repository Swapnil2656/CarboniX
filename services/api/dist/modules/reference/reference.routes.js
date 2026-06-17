"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reference_controller_1 = require("./reference.controller");
const router = (0, express_1.Router)();
router.get('/regions', reference_controller_1.getRegions);
router.get('/instances', reference_controller_1.getInstances);
router.get('/providers', reference_controller_1.getProviders);
exports.default = router;
