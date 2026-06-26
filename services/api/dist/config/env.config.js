"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    EMISSIONS_API_KEY: process.env.EMISSIONS_API_KEY || '',
    USE_STATIC_GRID_DATA: process.env.USE_STATIC_GRID_DATA === 'true' || false,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    USE_MOCK_AGENTS: process.env.USE_MOCK_AGENTS !== 'false', // true by default
    CARBON_BUDGET_KG_DAY: parseFloat(process.env.CARBON_BUDGET_KG_DAY || '10'),
};
