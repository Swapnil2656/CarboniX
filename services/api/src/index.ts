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
import aiRoutes from './modules/ai/ai.routes';

import { runCollector, enactRegionSwitch } from '@carbonix/agents';
import { runAnalyst } from '@carbonix/agents';
import { runReporter } from '@carbonix/agents';
import { prisma } from './lib/prisma';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

const USE_MOCK = process.env.USE_MOCK_AGENTS === 'true';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json());

app.use((req, res, next) => { console.log('[API REQUEST]', req.method, req.url, req.headers.authorization ? 'HasAuth' : 'NoAuth'); const oldSend = res.send.bind(res); res.send = function(data?: any) { console.log('[API RESPONSE]', res.statusCode, data); return oldSend(data); }; next(); });

app.get('/api/v1/health', (req, res) => {
  res.json({ message: 'CarboniX API is running!', agents: true, mockMode: USE_MOCK });
});

app.use('/api/v1/carbon', carbonRoutes);
app.use('/api/v1/reference', referenceRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/connect', connectRoutes);
app.use('/api/v1/ai', aiRoutes);

app.post('/api/v1/public/accept-invite', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    await prisma.teamMember.updateMany({
      where: { email, status: 'PENDING' },
      data: { status: 'ACTIVE' }
    });
    
    res.json({ success: true, message: 'Invitation accepted!' });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Agent Cron Scheduling ───────────────────────────────────

// Run Collector + Analyst every hour
cron.schedule('0 * * * *', async () => {
  if (!USE_MOCK) {
    console.log('[CRON] Skipping hourly collector (mock mode disabled, waiting for live ingest)...');
    return;
  }
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

    const analystResult = await runAnalyst(collectorResult.records, NVIDIA_API_KEY);

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

    // 3. Enact Real Agentic Actions for Agentic Projects
    const agenticProjects = await prisma.project.findMany({
      where: { agenticMode: true },
      include: { platformCredentials: true }
    });

    for (const project of agenticProjects) {
      // Find a region migration recommendation to enact
      const migrationRec = analystResult.recommendations.find(r => r.recommendedAction === 'MIGRATE_REGION');
      if (migrationRec) {
        console.log(`[CRON] Agentic Action: Enacting region switch for project ${project.name} (${project.id})...`);
        try {
          const result = await enactRegionSwitch(
            project.id,
            project.name,
            migrationRec,
            project.platformCredentials.map(c => ({ provider: c.provider, token: c.token }))
          );
          console.log(`[CRON] Platform action result:`, result.message);
        } catch (e) {
          console.error(`[CRON] Failed to enact platform action for ${project.name}:`, e);
        }
      }
    }
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

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Agent mock mode: ${USE_MOCK ? 'ON (static data)' : 'OFF (live CloudWatch)'}`);
  console.log(`Cron: Collector+Analyst every hour, Reporter on 1st of month`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    console.log('Prisma disconnected');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
