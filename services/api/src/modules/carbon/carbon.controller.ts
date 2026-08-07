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
        provider: input.provider.toUpperCase() as any,
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
    if (error.message && error.message.includes('not found for provider')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const compare = async (req: Request, res: Response) => {
  try {
    // Add default values for compare if missing
    const input: CalculationInput = {
      provider: req.body.provider || 'aws',
      region: req.body.region || 'us-east-1',
      instanceType: req.body.instanceType || (req.body.provider === 'gcp' ? 'e2-standard-8' : req.body.provider === 'azure' ? 'Standard_D8s_v3' : 'm5.2xlarge'),
      instanceCount: req.body.instanceCount || 1,
      hoursPerMonth: req.body.durationHours || req.body.hoursPerMonth || 730,
      cpuUtilization: req.body.cpuUtilization || 0.5,
      storageGb: req.body.storageGb || 500,
      ramGb: req.body.memoryGb || req.body.ramGb || 32,
    };

    const baseResult = { ...await calculateCarbon(input), provider: input.provider, region: input.region };
    
    // Generate comparison options mapping equivalent instance types
    const options = [];
    if (input.provider !== 'aws' || input.region !== 'eu-west-1') {
      options.push({ ...await calculateCarbon({ ...input, provider: 'aws', region: 'eu-west-1', instanceType: 'm5.2xlarge' }), provider: 'aws', region: 'eu-west-1' });
    }
    if (input.provider !== 'gcp' || input.region !== 'eu-north-1') {
      options.push({ ...await calculateCarbon({ ...input, provider: 'gcp', region: 'eu-north-1', instanceType: 'e2-standard-8' }), provider: 'gcp', region: 'eu-north-1' });
    }
    if (input.provider !== 'azure' || input.region !== 'northeurope') {
      options.push({ ...await calculateCarbon({ ...input, provider: 'azure', region: 'northeurope', instanceType: 'Standard_D8s_v3' }), provider: 'azure', region: 'northeurope' });
    }

    res.json({ success: true, data: { base: baseResult, options } });
  } catch (error: any) {
    if (error.message && error.message.includes('not found for provider')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
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
      if (input.recordId) {
        try {
          // Attempt to persist the recommendation so it survives page reloads
          await prisma.emissionRecord.update({
            where: { id: input.recordId },
            data: { recommendation: recommendation.recommendation }
          });
        } catch (e) {
          console.error("Failed to save recommendation to record:", e);
        }
      }

      return res.json({ 
        success: true, 
        data: {
          recommended: {
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
    if (error.message && error.message.includes('not found for provider')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
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
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

async function resolveProjectForApiKey(apiKey: any, projectName?: string): Promise<string | null> {
  if (!apiKey || !apiKey.createdBy) return null;
  if (apiKey.projectId) return apiKey.projectId;

  if (projectName && typeof projectName === 'string') {
    const proj = await prisma.project.findFirst({
      where: {
        userId: apiKey.createdBy,
        name: { equals: projectName.trim(), mode: 'insensitive' }
      }
    });
    if (proj) return proj.id;
  }

  if (apiKey.name && typeof apiKey.name === 'string') {
    const derivedName = apiKey.name.replace(/\s+(Default\s+)?Key$/i, '').trim();
    if (derivedName && derivedName !== apiKey.name) {
      const proj = await prisma.project.findFirst({
        where: {
          userId: apiKey.createdBy,
          name: { equals: derivedName, mode: 'insensitive' }
        }
      });
      if (proj) return proj.id;
    }
  }

  const projects = await prisma.project.findMany({
    where: { userId: apiKey.createdBy },
    orderBy: { createdAt: 'desc' }
  });
  if (projects.length === 1) return projects[0].id;
  return projects[0]?.id || null;
}

export const verifyKey = async (req: ApiKeyRequest, res: Response) => {
  try {
    if (req.apiKey) {
      const { projectName } = req.body || {};
      const projectId = await resolveProjectForApiKey(req.apiKey, projectName);
      if (projectId) {
        const now = new Date();
        const existingProject = await prisma.project.findUnique({ where: { id: projectId } });
        await prisma.project.update({
          where: { id: projectId },
          data: {
            sdkConnected: true,
            lastPingAt: now,
            connectedAt: existingProject?.connectedAt || now
          }
        });
      }
    }
    res.json({ success: true, message: 'Key is valid', apiKey: req.apiKey });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const initProject = async (req: ApiKeyRequest, res: Response) => {
  try {
    if (req.apiKey) {
      const { projectName, projectProfile } = req.body || {};
      const projectId = await resolveProjectForApiKey(req.apiKey, projectName);
      if (projectId) {
        await prisma.project.update({
          where: { id: projectId },
          data: {
            configInitializedAt: new Date(),
            projectProfile: projectProfile || {}
          }
        });
      }
    }
    res.json({ success: true, message: 'Project initialized' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Internal server error' });
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
    
    // Update the project's sdkConnected status
    let resolvedProjectId: string | null = null;
    let resolvedDeploymentId: string | null = null;
    if (req.apiKey) {
      resolvedProjectId = await resolveProjectForApiKey(req.apiKey, projectName);
      if (resolvedProjectId) {
        const now = new Date();
        const existingProject = await prisma.project.findUnique({ 
          where: { id: resolvedProjectId },
          include: { deployments: { include: { platformToken: true } } }
        });
        
        if (existingProject) {
          await prisma.project.update({
            where: { id: resolvedProjectId },
            data: {
              sdkConnected: true,
              lastPingAt: now,
              connectedAt: existingProject.connectedAt || now
            }
          });
          
          if (projectName) {
            const upperName = projectName.toUpperCase();
            
            // Try matching by platform first (for PaaS integrations)
            const targetPlatform = upperName.startsWith('VERCEL') ? 'VERCEL' 
                                 : upperName.startsWith('RAILWAY') ? 'RAILWAY'
                                 : upperName.startsWith('RENDER') ? 'RENDER'
                                 : upperName.startsWith('NETLIFY') ? 'NETLIFY'
                                 : null;
            if (targetPlatform) {
              const matchingDeployment = existingProject.deployments.find((d: any) => d.platformToken?.platform === targetPlatform);
              if (matchingDeployment) {
                resolvedDeploymentId = matchingDeployment.id;
              }
            }

            // If no platform match, try matching by role if project name contains hints
            if (!resolvedDeploymentId && existingProject.deployments.length > 0) {
              const roleHint = upperName.includes('FRONT') ? 'FRONTEND' 
                             : upperName.includes('BACK') || upperName.includes('API') ? 'BACKEND' 
                             : null;
              if (roleHint) {
                const matchingDeployment = existingProject.deployments.find((d: any) => d.role === roleHint);
                if (matchingDeployment) {
                  resolvedDeploymentId = matchingDeployment.id;
                }
              }
            }

            // Fallback: If still no match and there's exactly one deployment, or one "OTHER" deployment, use it
            if (!resolvedDeploymentId && existingProject.deployments.length > 0) {
              const emptyDeployments = existingProject.deployments.filter((d: any) => !d.region || d.region === 'Unknown');
              if (emptyDeployments.length > 0) {
                resolvedDeploymentId = emptyDeployments[0].id;
              } else {
                resolvedDeploymentId = existingProject.deployments[0].id;
              }
            }
          }

          // Update Project Region as a fallback
          await prisma.project.update({
            where: { id: existingProject.id },
            data: {
              region: input.region,
              provider: input.provider.toUpperCase() as any,
            }
          });

          // Update Deployment Region
          if (resolvedDeploymentId) {
            await prisma.deployment.update({
              where: { id: resolvedDeploymentId },
              data: {
                region: input.region,
                provider: input.provider.toUpperCase() as any,
              }
            });
          }
        }
      }
    }

    // Create the EmissionRecord
    const record = await prisma.emissionRecord.create({
      data: {
        instanceId: instanceId || `cli-${Date.now()}`,
        instanceType: input.instanceType,
        provider: input.provider.toUpperCase() as any,
        region: input.region,
        instanceName: projectName,
        projectId: resolvedProjectId, // Set the real tenant link
        deploymentId: resolvedDeploymentId,
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
    if (error.message && error.message.includes('not found for provider')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
