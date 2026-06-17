import { Request, Response } from 'express';
import { calculateCarbon, CalculationInput, getCarbonRating, getEquivalent, getRecommendation } from './carbon.engine';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { CarbonService } from './services/carbon.service';
import { logger } from '../../lib/logger';

const carbonService = new CarbonService();

export const calculate = async (req: AuthRequest, res: Response) => {
  try {
    const input: CalculationInput = req.body;
    
    // Basic validation
    if (!input.provider || !input.region || !input.instanceType || !input.instanceCount || !input.hoursPerMonth || input.cpuUtilization === undefined || input.storageGb === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required parameters' });
    }

    const result = await calculateCarbon(input);
    const ratingResult = getCarbonRating(result.co2KgMonth);
    const equivalent = getEquivalent(result.co2KgMonth);
    const recommendation = await getRecommendation(input.provider, input.region, result.co2KgMonth, result.totalFinalEnergyKwh);
    
    const userId = req.user!.id;
    
    // Removed dummy user upsert

    const calculation = await prisma.calculation.create({
      data: {
        userId: userId,
        provider: input.provider as any,
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
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const compare = async (req: Request, res: Response) => {
  try {
    const input: CalculationInput = req.body;
    const result = await calculateCarbon(input);
    res.json({ success: true, data: { base: result } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const recommend = async (req: Request, res: Response) => {
  try {
    // Phase 2 implementation of recommendations is coming up
    res.json({ 
      success: true, 
      data: {} 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const calculateEmissions = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    logger.error('Error calculating emissions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
