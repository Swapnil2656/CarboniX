"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestTelemetry = exports.verifyKey = exports.calculateEmissions = exports.recommend = exports.compare = exports.calculate = void 0;
const carbon_engine_1 = require("./carbon.engine");
const prisma_1 = require("../../lib/prisma");
const carbon_service_1 = require("./services/carbon.service");
const logger_1 = require("../../lib/logger");
const carbonService = new carbon_service_1.CarbonService();
const calculate = async (req, res) => {
    try {
        const input = req.body;
        // Basic validation
        if (!input.provider || !input.region || !input.instanceType || !input.instanceCount || !input.hoursPerMonth || input.cpuUtilization === undefined || input.storageGb === undefined) {
            return res.status(400).json({ success: false, error: 'Missing required parameters' });
        }
        const result = await (0, carbon_engine_1.calculateCarbon)(input);
        const ratingResult = (0, carbon_engine_1.getCarbonRating)(result.co2KgMonth);
        const equivalent = (0, carbon_engine_1.getEquivalent)(result.co2KgMonth);
        const recommendation = await (0, carbon_engine_1.getRecommendation)(input.provider, input.region, result.co2KgMonth, result.totalFinalEnergyKwh);
        const userId = req.user.id;
        // Removed dummy user upsert
        const calculation = await prisma_1.prisma.calculation.create({
            data: {
                userId: userId,
                provider: input.provider,
                region: input.region,
                regionName: input.region, // Can be enhanced later
                instanceType: input.instanceType,
                instanceCount: input.instanceCount,
                hoursPerMonth: input.hoursPerMonth,
                cpuUtilization: input.cpuUtilization,
                storageGB: input.storageGb,
                ramGB: input.ramGb || 0,
                energyComputeKwh: result.cpuEnergyKwh,
                energyMemoryKwh: result.memoryEnergyKwh,
                energyStorageKwh: result.storageEnergyKwh,
                energyTotalKwh: result.totalItEnergyKwh,
                co2GramsMonth: result.co2GramsMonth,
                co2KgMonth: result.co2KgMonth,
                co2GramsHour: result.co2GramsHour,
                gridIntensity: result.gridIntensity,
                computePercentage: result.computePercentage,
                memoryPercentage: result.memoryPercentage,
                storagePercentage: result.storagePercentage,
                rating: ratingResult.rating,
                ratingColor: ratingResult.color,
                realWorldEquivalent: equivalent,
                recommendation: recommendation.recommendation || 'Already optimized',
                recommendedRegion: recommendation.recommendedRegion,
                potentialReductionPct: recommendation.reductionPercent,
                responseTimeMs: 0
            }
        });
        // Invalidate the user's history cache since a new calculation was just added
        Promise.resolve().then(() => __importStar(require('../../lib/redis'))).then(({ redis }) => {
            redis.del(`history:${userId}`).catch(console.error);
        });
        res.json({
            success: true,
            data: {
                ...result,
                rating: ratingResult,
                equivalent,
                recommendation
            },
            calculationId: calculation.id
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.calculate = calculate;
const compare = async (req, res) => {
    try {
        const input = req.body;
        const baseResult = await (0, carbon_engine_1.calculateCarbon)(input);
        // Generate comparison options
        const options = [];
        if (input.provider !== 'aws' || input.region !== 'eu-west-1') {
            options.push(await (0, carbon_engine_1.calculateCarbon)({ ...input, provider: 'aws', region: 'eu-west-1' }));
        }
        if (input.provider !== 'gcp' || input.region !== 'eu-north-1') {
            options.push(await (0, carbon_engine_1.calculateCarbon)({ ...input, provider: 'gcp', region: 'eu-north-1' }));
        }
        if (input.provider !== 'azure' || input.region !== 'northeurope') {
            options.push(await (0, carbon_engine_1.calculateCarbon)({ ...input, provider: 'azure', region: 'northeurope' }));
        }
        res.json({ success: true, data: { base: baseResult, options } });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.compare = compare;
const recommend = async (req, res) => {
    try {
        const input = req.body;
        const baseResult = await (0, carbon_engine_1.calculateCarbon)(input);
        const recResult = await (0, carbon_engine_1.calculateCarbon)({ ...input, provider: 'gcp', region: 'eu-north-1' });
        res.json({
            success: true,
            data: {
                recommended: {
                    provider: 'gcp',
                    region: 'eu-north-1',
                    co2KgMonth: recResult.co2KgMonth,
                    savingsKg: Math.max(0, baseResult.co2KgMonth - recResult.co2KgMonth)
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.recommend = recommend;
const calculateEmissions = async (req, res) => {
    try {
        const { energyKwh, countryCode } = req.body;
        if (energyKwh === undefined || !countryCode) {
            return res.status(400).json({ success: false, error: 'Missing energyKwh or countryCode' });
        }
        const result = await carbonService.calculateCarbon({
            energyKwh: Number(energyKwh),
            countryCode: String(countryCode).toUpperCase()
        });
        res.json(result);
    }
    catch (error) {
        logger_1.logger.error('Error calculating emissions:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.calculateEmissions = calculateEmissions;
const verifyKey = async (req, res) => {
    try {
        // If the middleware passed, the key is valid.
        res.json({ success: true, message: 'Key is valid', apiKey: req.apiKey });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.verifyKey = verifyKey;
const ingestTelemetry = async (req, res) => {
    try {
        const { instanceId, instanceType, provider, region, cpuUtilization, storageGb, projectName } = req.body;
        // Simulate hours based on typical run or default to 1 for this reading
        const hoursPerMonth = 1;
        const input = {
            provider: provider || 'aws',
            region: region || 'us-east-1',
            instanceType: instanceType || 't3.medium',
            instanceCount: 1,
            hoursPerMonth,
            cpuUtilization: cpuUtilization || 0.1,
            storageGb: storageGb || 0,
            ramGb: 0
        };
        const result = await (0, carbon_engine_1.calculateCarbon)(input);
        // Create the EmissionRecord
        const record = await prisma_1.prisma.emissionRecord.create({
            data: {
                instanceId: instanceId || `cli-${Date.now()}`,
                instanceType: input.instanceType,
                provider: input.provider.toUpperCase(),
                region: input.region,
                instanceName: projectName,
                cpuUtilization: input.cpuUtilization,
                energyKwh: result.totalFinalEnergyKwh,
                gridIntensity: result.gridIntensity,
                carbonKg: result.co2KgMonth,
                isIdle: input.cpuUtilization < 0.05,
                isOversized: input.cpuUtilization < 0.20
            }
        });
        res.json({ success: true, data: record });
    }
    catch (error) {
        logger_1.logger.error('Error ingesting telemetry:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.ingestTelemetry = ingestTelemetry;
