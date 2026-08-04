import { Response } from 'express';
import { ApiKeyRequest } from '../../middleware/apiKey.middleware';
import { prisma } from '../../lib/prisma';
import { calculateCarbon } from '@carbonix/core';

export class AgentController {
  public async reportTelemetry(req: ApiKeyRequest, res: Response) {
    try {
      const apiKey = req.apiKey;
      
      // Ensure the key has the agent_control permission
      if (!apiKey?.permissions?.includes('agent_control')) {
        return res.status(403).json({ 
          success: false, 
          error: 'Forbidden: API Key lacks agent_control permission' 
        });
      }

      const {
        instanceId,
        instanceType = 't3.micro', // default if not provided by local agent
        provider = 'AWS', // generic default for self-hosted
        region = 'unknown',
        cpuUtilization,
        memoryUtilization = 0.5,
        networkInGb = 0,
        networkOutGb = 0
      } = req.body;

      if (cpuUtilization === undefined) {
        return res.status(400).json({ success: false, error: 'cpuUtilization is required' });
      }

      // We need to store this in EmissionRecord for the user
      // For now we calculate a quick snapshot based on 1 hour of usage 
      // (the local agent can report its own delta time, but for simplicity we assume it reports hourly or we scale it)
      // Real implementation would track deltas.

      const calcResult = await calculateCarbon({
        provider,
        region: region === 'unknown' ? 'us-east-1' : region, // fallback
        instanceType,
        instanceCount: 1,
        hoursPerMonth: 1, // Snapshot representing 1 hour of runtime
        cpuUtilization,
        storageGb: 0
      });

      const isIdle = cpuUtilization < 0.05;
      const isOversized = cpuUtilization < 0.20 && !isIdle;

      // Ensure user has a default project if we don't have a specific project bound to the API Key
      // Or bind it to the API key's projectId if present
      let projectId = apiKey.projectId;
      if (!projectId) {
        const firstProject = await prisma.project.findFirst({
          where: { userId: apiKey.createdBy }
        });
        projectId = firstProject?.id;
      }

      if (!projectId) {
        return res.status(400).json({ success: false, error: 'No associated project found for telemetry.' });
      }

      await prisma.emissionRecord.create({
        data: {
          projectId,
          instanceId: instanceId || `agent-${apiKey.id}`,
          instanceType,
          provider,
          region: region === 'unknown' ? 'us-east-1' : region,
          cpuUtilization,
          memoryUtilization,
          networkInGb,
          networkOutGb,
          energyKwh: calcResult.totalFinalEnergyKwh,
          gridIntensity: calcResult.gridIntensity,
          carbonKg: calcResult.co2KgMonth,
          isIdle,
          isOversized,
          // metadata could hold agent details
        }
      });

      // Update API Key usage stats
      await prisma.apiKey.update({
        where: { id: apiKey.id },
        data: {
          totalRequests: { increment: 1 },
          todayRequests: { increment: 1 },
          lastUsedAt: new Date()
        }
      });

      return res.status(200).json({ success: true, message: 'Telemetry recorded successfully' });
    } catch (error: any) {
      console.error('[AgentController] Error reporting telemetry:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
