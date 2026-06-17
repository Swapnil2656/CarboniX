"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommend = exports.compare = exports.calculate = void 0;
const carbon_engine_1 = require("./carbon.engine");
const prisma_1 = require("../../lib/prisma");
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
        const result = await (0, carbon_engine_1.calculateCarbon)(input);
        res.json({ success: true, data: { base: result } });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.compare = compare;
const recommend = async (req, res) => {
    try {
        // Phase 2 implementation of recommendations is coming up
        res.json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.recommend = recommend;
