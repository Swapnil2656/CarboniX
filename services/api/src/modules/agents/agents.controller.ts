/**
 * CarboniX Agent Controller
 * 
 * Handles all agent-related API requests: triggering agents,
 * fetching agent runs, and retrieving emission data.
 */

import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { runCollector } from '@carbonix/agents';
import { runAnalyst } from '@carbonix/agents';
import { runGateAgent } from '@carbonix/agents';
import { runReporter } from '@carbonix/agents';

const USE_MOCK = process.env.USE_MOCK_AGENTS !== 'false';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const CARBON_BUDGET = parseFloat(process.env.CARBON_BUDGET_KG_DAY || '10');

/**
 * GET /api/v1/agents/runs — List recent agent runs (feed)
 */
export const listAgentRuns = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const offset = parseInt(req.query.offset as string) || 0;
    const agentType = req.query.type as string;

    const where = agentType ? { agentType: agentType as any } : {};

    const runs = await prisma.agentRun.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.agentRun.count({ where });

    res.json({
      success: true,
      data: runs,
      pagination: { total, limit, offset },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/agents/runs/:id — Get details of a specific run
 */
export const getAgentRun = async (req: Request, res: Response) => {
  try {
    const run = await prisma.agentRun.findUnique({
      where: { id: req.params.id },
    });

    if (!run) {
      return res.status(404).json({ success: false, error: 'Agent run not found' });
    }

    res.json({ success: true, data: run });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/agents/trigger/collector — Manually trigger Collector Agent
 */
export const triggerCollector = async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();

    // Create the AgentRun record
    const agentRun = await prisma.agentRun.create({
      data: {
        agentType: 'COLLECTOR',
        status: 'RUNNING',
        triggeredBy: 'manual',
      },
    });

    // Run the collector
    const result = await runCollector(USE_MOCK);

    // Persist emission records
    const createdRecords = await prisma.emissionRecord.createMany({
      data: result.records.map(r => ({
        agentRunId: agentRun.id,
        instanceId: r.instanceId,
        instanceType: r.instanceType,
        provider: r.provider as any,
        region: r.region,
        instanceName: r.instanceName,
        cpuUtilization: r.cpuUtilization,
        memoryUtilization: r.memoryUtilization,
        networkInGb: r.networkInGb,
        networkOutGb: r.networkOutGb,
        energyKwh: r.energyKwh,
        gridIntensity: r.gridIntensity,
        carbonKg: r.carbonKg,
        isIdle: r.isIdle,
        isOversized: r.isOversized,
      })),
    });

    // Update the AgentRun with results
    const durationMs = Date.now() - startTime;
    await prisma.agentRun.update({
      where: { id: agentRun.id },
      data: {
        status: 'SUCCESS',
        summary: result.summary,
        details: {
          totalCarbonKg: result.totalCarbonKg,
          idleCount: result.idleCount,
          oversizedCount: result.oversizedCount,
          instanceCount: result.instanceCount,
          mockMode: USE_MOCK,
        },
        recordsProcessed: result.instanceCount,
        completedAt: new Date(),
        durationMs,
      },
    });

    res.json({
      success: true,
      data: {
        runId: agentRun.id,
        summary: result.summary,
        totalCarbonKg: result.totalCarbonKg,
        idleCount: result.idleCount,
        oversizedCount: result.oversizedCount,
        instanceCount: result.instanceCount,
        durationMs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/agents/trigger/analyst — Manually trigger Analyst Agent
 */
export const triggerAnalyst = async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();

    // Get latest emission records
    const latestCollectorRun = await prisma.agentRun.findFirst({
      where: { agentType: 'COLLECTOR', status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestCollectorRun) {
      return res.status(400).json({
        success: false,
        error: 'No collector data found. Run the Collector Agent first.',
      });
    }

    const records = await prisma.emissionRecord.findMany({
      where: { agentRunId: latestCollectorRun.id },
    });

    // Create AgentRun
    const agentRun = await prisma.agentRun.create({
      data: {
        agentType: 'ANALYST',
        status: 'RUNNING',
        triggeredBy: 'manual',
      },
    });

    // Run the analyst
    const result = await runAnalyst(
      records.map(r => ({
        instanceId: r.instanceId,
        instanceType: r.instanceType,
        instanceName: r.instanceName || r.instanceId,
        provider: r.provider as any,
        region: r.region,
        cpuUtilization: r.cpuUtilization,
        memoryUtilization: r.memoryUtilization || 0,
        networkInGb: r.networkInGb || 0,
        networkOutGb: r.networkOutGb || 0,
        energyKwh: r.energyKwh,
        gridIntensity: r.gridIntensity,
        carbonKg: r.carbonKg,
        isIdle: r.isIdle,
        isOversized: r.isOversized,
      })),
      GEMINI_API_KEY
    );

    // Update recommendations on the emission records
    for (const rec of result.recommendations) {
      await prisma.emissionRecord.updateMany({
        where: { instanceId: rec.instanceId, agentRunId: latestCollectorRun.id },
        data: { recommendation: rec.reasoning },
      });
    }

    // Update the AgentRun
    const durationMs = Date.now() - startTime;
    await prisma.agentRun.update({
      where: { id: agentRun.id },
      data: {
        status: 'SUCCESS',
        summary: result.summary,
        details: {
          recommendations: result.recommendations,
          totalCurrentKg: result.totalCurrentKg,
          totalProjectedKg: result.totalProjectedKg,
          totalSavingsKg: result.totalSavingsKg,
          idleCount: result.idleInstances.length,
          oversizedCount: result.oversizedInstances.length,
        },
        recordsProcessed: records.length,
        completedAt: new Date(),
        durationMs,
      },
    });

    res.json({
      success: true,
      data: {
        runId: agentRun.id,
        summary: result.summary,
        recommendations: result.recommendations,
        totalSavingsKg: result.totalSavingsKg,
        durationMs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/agents/gate — Run CI/CD Gate on a diff
 */
export const runGate = async (req: Request, res: Response) => {
  try {
    const { diff, budget } = req.body;

    if (!diff) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: diff (infrastructure diff string)',
      });
    }

    const startTime = Date.now();

    const agentRun = await prisma.agentRun.create({
      data: {
        agentType: 'CICD_GATE',
        status: 'RUNNING',
        triggeredBy: 'webhook',
      },
    });

    const result = await runGateAgent(diff, budget || CARBON_BUDGET);
    const durationMs = Date.now() - startTime;

    await prisma.agentRun.update({
      where: { id: agentRun.id },
      data: {
        status: 'SUCCESS',
        summary: result.summary,
        details: {
          passed: result.passed,
          deltaKgPerDay: result.deltaKgPerDay,
          budgetKgPerDay: result.budgetKgPerDay,
          resources: result.resources,
        },
        recordsProcessed: result.resources.length,
        completedAt: new Date(),
        durationMs,
      },
    });

    res.json({
      success: true,
      data: {
        passed: result.passed,
        deltaKg: result.deltaKgPerDay,
        comment: result.comment,
        summary: result.summary,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/v1/agents/trigger/reporter — Manually trigger Reporter Agent
 */
export const triggerReporter = async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();

    // Get all emission records (from latest collector run or all recent)
    const records = await prisma.emissionRecord.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    if (records.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No emission records found. Run the Collector Agent first.',
      });
    }

    const agentRun = await prisma.agentRun.create({
      data: {
        agentType: 'REPORTER',
        status: 'RUNNING',
        triggeredBy: 'manual',
      },
    });

    const result = await runReporter(
      records.map(r => ({
        instanceId: r.instanceId,
        instanceType: r.instanceType,
        instanceName: r.instanceName || r.instanceId,
        provider: r.provider as any,
        region: r.region,
        cpuUtilization: r.cpuUtilization,
        memoryUtilization: r.memoryUtilization || 0,
        networkInGb: r.networkInGb || 0,
        networkOutGb: r.networkOutGb || 0,
        energyKwh: r.energyKwh,
        gridIntensity: r.gridIntensity,
        carbonKg: r.carbonKg,
        isIdle: r.isIdle,
        isOversized: r.isOversized,
      }))
    );

    const durationMs = Date.now() - startTime;

    await prisma.agentRun.update({
      where: { id: agentRun.id },
      data: {
        status: 'SUCCESS',
        summary: result.summary,
        details: result.report as any,
        recordsProcessed: records.length,
        completedAt: new Date(),
        durationMs,
      },
    });

    res.json({
      success: true,
      data: {
        runId: agentRun.id,
        summary: result.summary,
        report: result.report,
        durationMs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/agents/emissions — Get latest emission records
 */
export const getEmissions = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);

    const records = await prisma.emissionRecord.findMany({
      orderBy: { timestamp: 'desc' },
      take: limit,
    });

    res.json({ success: true, data: records });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/v1/agents/report/brsr — Get latest BRSR report
 */
export const getLatestBRSR = async (req: Request, res: Response) => {
  try {
    const latestReport = await prisma.agentRun.findFirst({
      where: { agentType: 'REPORTER', status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
    });

    if (!latestReport) {
      return res.status(404).json({
        success: false,
        error: 'No BRSR report found. Trigger the Reporter Agent first.',
      });
    }

    res.json({ success: true, data: latestReport.details });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
