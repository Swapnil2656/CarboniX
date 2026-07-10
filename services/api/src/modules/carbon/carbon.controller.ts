import { Request, Response } from 'express';
import { calculateCarbon, CalculationInput, getCarbonRating, getEquivalent, getRecommendation } from './carbon.engine';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { ApiKeyRequest } from '../../middleware/apiKey.middleware';
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
    
    // Ensure user exists to satisfy foreign key constraints (useful for Postman testing)
    await prisma.mobileUser.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: req.user!.email || 'test@carbonix.dev',
        name: `User ${userId}`,
        passwordHash: 'hashed_mock_password'
      }
    });
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

    // Invalidate the user's history cache since a new calculation was just added
    import('../../lib/redis').then(({ redis }) => {
      redis.del(`history:${userId}`).catch(console.error);
    });

    // --- AUTO NOTIFICATIONS ---
    const user = await prisma.mobileUser.findUnique({ where: { id: userId } });

    // 1. High emission alert
    if (user?.notificationsEnabled && result.co2KgMonth > (user.carbonAlertThreshold || 50)) {
      await prisma.userNotification.create({
        data: {
          userId,
          title: 'High Emission Detected',
          body: `Your ${input.provider.toUpperCase()} ${input.region} calculation produced ${result.co2KgMonth.toFixed(1)} kg CO₂ — exceeds your ${user.carbonAlertThreshold}kg threshold.`,
          type: 'HIGH_EMISSION',
          data: { calculationId: calculation.id, co2Kg: result.co2KgMonth, region: input.region }
        }
      });
    }

    // 2. Budget alert
    if (user?.budgetAlertEnabled) {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthlyTotal = await prisma.calculation.aggregate({
        where: { userId, createdAt: { gte: monthStart } },
        _sum: { co2KgMonth: true }
      });
      
      const totalKg = monthlyTotal._sum.co2KgMonth || 0;
      const budget = user.carbonBudgetKg || 100;
      
      if (totalKg >= budget * 0.8) {
        await prisma.userNotification.create({
          data: {
            userId,
            title: totalKg >= budget ? 'Carbon Budget Exceeded' : 'Carbon Budget Warning',
            body: `Monthly usage: ${totalKg.toFixed(1)} / ${budget} kg CO₂ (${Math.round((totalKg / budget) * 100)}%)`,
            type: 'BUDGET_ALERT',
            data: { usedKg: totalKg, budgetKg: budget }
          }
        });
      }
    }

    // 3. Green tip
    if (user?.greenTipsEnabled && recommendation.reductionPercent && recommendation.reductionPercent > 50) {
      await prisma.userNotification.create({
        data: {
          userId,
          title: 'Greener Region Available',
          body: `Switching to ${recommendation.recommendedRegion} could reduce carbon by ${recommendation.reductionPercent}%`,
          type: 'GREEN_TIP',
          data: { currentRegion: input.region, recommendedRegion: recommendation.recommendedRegion }
        }
      });
    }
    // --- END AUTO NOTIFICATIONS ---

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
    const baseResult = await calculateCarbon(input);
    
    // Generate comparison options
    const options = [];
    if (input.provider !== 'aws' || input.region !== 'eu-west-1') {
      options.push(await calculateCarbon({ ...input, provider: 'aws', region: 'eu-west-1' }));
    }
    if (input.provider !== 'gcp' || input.region !== 'eu-north-1') {
      options.push(await calculateCarbon({ ...input, provider: 'gcp', region: 'eu-north-1' }));
    }
    if (input.provider !== 'azure' || input.region !== 'northeurope') {
      options.push(await calculateCarbon({ ...input, provider: 'azure', region: 'northeurope' }));
    }

    res.json({ success: true, data: { base: baseResult, options } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const recommend = async (req: Request, res: Response) => {
  try {
    const input: CalculationInput = req.body;
    const baseResult = await calculateCarbon(input);
    
    // Get the recommendation from the engine (scoped to the requested provider)
    const recommendation = await getRecommendation(
      input.provider,
      input.region,
      baseResult.co2KgMonth,
      baseResult.totalFinalEnergyKwh
    );

    if (recommendation.recommendedRegion) {
      res.json({ 
        success: true, 
        data: {
          recommended: {
              provider: input.provider,
              region: recommendation.recommendedRegion,
              co2KgMonth: recommendation.recommendedCo2Kg,
              savingsKg: Math.max(0, baseResult.co2KgMonth - (recommendation.recommendedCo2Kg || 0)),
              reductionPercent: recommendation.reductionPercent,
              message: recommendation.recommendation
          }
        } 
      });
    } else {
      res.json({
        success: true,
        data: {
          message: 'You are already in the greenest region for your provider.'
        }
      });
    }
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

export const verifyKey = async (req: ApiKeyRequest, res: Response) => {
  try {
    // If the middleware passed, the key is valid.
    res.json({ success: true, message: 'Key is valid', apiKey: req.apiKey });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const ingestTelemetry = async (req: ApiKeyRequest, res: Response) => {
  try {
    const { instanceId, instanceType, provider, region, cpuUtilization, storageGb, projectName } = req.body;
    
    // Simulate hours based on typical run or default to 1 for this reading
    const hoursPerMonth = 1;
    
    const input: CalculationInput = {
      provider: provider || 'aws',
      region: region || 'us-east-1',
      instanceType: instanceType || 't3.medium',
      instanceCount: 1,
      hoursPerMonth,
      cpuUtilization: cpuUtilization || 0.1,
      storageGb: storageGb || 0,
      ramGb: 0
    };

    const result = await calculateCarbon(input);
    
    // Create the EmissionRecord
    const record = await prisma.emissionRecord.create({
      data: {
        instanceId: instanceId || `cli-${Date.now()}`,
        instanceType: input.instanceType,
        provider: input.provider.toUpperCase() as any,
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
  } catch (error: any) {
    logger.error('Error ingesting telemetry:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
