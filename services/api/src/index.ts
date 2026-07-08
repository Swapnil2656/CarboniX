import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cron from 'node-cron';

import carbonRoutes from './modules/carbon/carbon.routes';
import referenceRoutes from './modules/reference/reference.routes';
import authRoutes from './modules/auth/auth.routes';
import agentRoutes from './modules/agents/agents.routes';
import adminRoutes from './modules/admin/admin.routes';
import connectRoutes from './modules/connect/connect.routes';

import { runCollector } from '@carbonix/agents';
import { runAnalyst } from '@carbonix/agents';
import { runReporter } from '@carbonix/agents';
import { prisma } from './lib/prisma';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const USE_MOCK = process.env.USE_MOCK_AGENTS !== 'false';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ message: 'CarboniX API is running!', agents: true, mockMode: USE_MOCK });
});

app.use('/api/v1/carbon', carbonRoutes);
app.use('/api/v1/reference', referenceRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/connect', connectRoutes);

// ─── Agent Cron Scheduling ───────────────────────────────────

// Run Collector + Analyst every hour
cron.schedule('0 * * * *', async () => {
  console.log('[CRON] Running Collector + Analyst agents...');
  try {
    const startTime = Date.now();

    // 1. Run Collector
    const collectorRun = await prisma.agentRun.create({
      data: { agentType: 'COLLECTOR', status: 'RUNNING', triggeredBy: 'cron' },
    });

    const collectorResult = await runCollector(USE_MOCK);

    await prisma.emissionRecord.createMany({
      data: collectorResult.records.map(r => ({
        agentRunId: collectorRun.id,
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

    await prisma.agentRun.update({
      where: { id: collectorRun.id },
      data: {
        status: 'SUCCESS',
        summary: collectorResult.summary,
        details: {
          totalCarbonKg: collectorResult.totalCarbonKg,
          idleCount: collectorResult.idleCount,
          oversizedCount: collectorResult.oversizedCount,
          instanceCount: collectorResult.instanceCount,
        },
        recordsProcessed: collectorResult.instanceCount,
        completedAt: new Date(),
        durationMs: Date.now() - startTime,
      },
    });

    console.log(`[CRON] Collector done: ${collectorResult.summary}`);

    // 2. Run Analyst
    const analystRun = await prisma.agentRun.create({
      data: { agentType: 'ANALYST', status: 'RUNNING', triggeredBy: 'cron' },
    });

    const analystResult = await runAnalyst(collectorResult.records, GEMINI_API_KEY);

    await prisma.agentRun.update({
      where: { id: analystRun.id },
      data: {
        status: 'SUCCESS',
        summary: analystResult.summary,
        details: {
          recommendations: analystResult.recommendations,
          totalSavingsKg: analystResult.totalSavingsKg,
        } as any,
        recordsProcessed: collectorResult.records.length,
        completedAt: new Date(),
        durationMs: Date.now() - startTime,
      },
    });

    console.log(`[CRON] Analyst done: ${analystResult.summary}`);
  } catch (error) {
    console.error('[CRON] Agent pipeline failed:', (error as Error).message);
  }
});

// Run Reporter on the 1st of every month at midnight
cron.schedule('0 0 1 * *', async () => {
  console.log('[CRON] Running monthly Reporter agent...');
  try {
    const records = await prisma.emissionRecord.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    const reporterRun = await prisma.agentRun.create({
      data: { agentType: 'REPORTER', status: 'RUNNING', triggeredBy: 'cron' },
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

    await prisma.agentRun.update({
      where: { id: reporterRun.id },
      data: {
        status: 'SUCCESS',
        summary: result.summary,
        details: result.report as any,
        recordsProcessed: records.length,
        completedAt: new Date(),
      },
    });

    console.log(`[CRON] Reporter done: ${result.summary}`);
  } catch (error) {
    console.error('[CRON] Reporter failed:', (error as Error).message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Agent mock mode: ${USE_MOCK ? 'ON (static data)' : 'OFF (live CloudWatch)'}`);
  console.log(`Cron: Collector+Analyst every hour, Reporter on 1st of month`);
});

