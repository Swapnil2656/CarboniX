"use strict";
/**
 * CarboniX Agents — Public API
 *
 * Exports all four agents for use by the Express API orchestration layer.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.enactRegionSwitch = exports.generateMockInstances = exports.runOrchestrator = exports.runReporter = exports.runGateAgent = exports.runAnalyst = exports.runCollector = void 0;
var collector_1 = require("./collector");
Object.defineProperty(exports, "runCollector", { enumerable: true, get: function () { return collector_1.runCollector; } });
var analyst_1 = require("./analyst");
Object.defineProperty(exports, "runAnalyst", { enumerable: true, get: function () { return analyst_1.runAnalyst; } });
var cicdGate_1 = require("./cicdGate");
Object.defineProperty(exports, "runGateAgent", { enumerable: true, get: function () { return cicdGate_1.runGateAgent; } });
var reporter_1 = require("./reporter");
Object.defineProperty(exports, "runReporter", { enumerable: true, get: function () { return reporter_1.runReporter; } });
var orchestrator_1 = require("./orchestrator");
Object.defineProperty(exports, "runOrchestrator", { enumerable: true, get: function () { return orchestrator_1.runOrchestrator; } });
var mockData_1 = require("./mockData");
Object.defineProperty(exports, "generateMockInstances", { enumerable: true, get: function () { return mockData_1.generateMockInstances; } });
var platform_agents_1 = require("./platform-agents");
Object.defineProperty(exports, "enactRegionSwitch", { enumerable: true, get: function () { return platform_agents_1.enactRegionSwitch; } });
