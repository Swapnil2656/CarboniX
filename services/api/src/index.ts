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
import localAgentRoutes from './modules/agent/agent.routes';

import { runCollector, runAnalyst, runReporter, enactRegionSwitch, collectFromPlatform, PlatformAuthError, PlatformTransientError } from '@carbonix/agents';
import { prisma } from './lib/prisma';
import { decryptToken } from './lib/platformTokenService';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json());

app.use((req, res, next) => { console.log('[API REQUEST]', req.method, req.url, req.headers.authorization ? 'HasAuth' : 'NoAuth'); const oldSend = res.send.bind(res); res.send = function(data?: any) { console.log('[API RESPONSE]', res.statusCode, data); return oldSend(data); }; next(); });

app.get('/api/v1/health', (req, res) => {
  res.json({ message: 'CarboniX API is running!', agents: true });
});

app.use('/api/v1/carbon', carbonRoutes);
app.use('/api/v1/reference', referenceRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/connect', connectRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/agent', localAgentRoutes);

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

// ─── Agent Cron Scheduling ────────────────────────────────────────────

/** Exponential backoff retry for transient platform errors (3 attempts max) */
async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof PlatformAuthError) throw err; // Auth errors don't retry
      lastErr = err;
      const backoffMs = 500 * Math.pow(2, attempt - 1); // 500ms, 1s, 2s
      console.warn(`[CRON] ${label}: transient error (attempt ${attempt}/3), retrying in ${backoffMs}ms:`, (err as Error).message);
      await new Promise(r => setTimeout(r, backoffMs));
    }
  }
  throw lastErr;
}

// Run Collector + Analyst every hour — per-project, dataSource-aware, isolated
cron.schedule('0 * * * *', async () => {
  console.log('[CRON] Running per-project Collector + Analyst...');
  const startTime = Date.now();

  // Fetch all projects with their active platform tokens
  const projects = await prisma.project.findMany({
    include: {
      platformTokens: { where: { status: 'ACTIVE' } },
      platformCredentials: true, // legacy, for enactRegionSwitch backward compat
    },
  });

  const allRecords: any[] = [];

  for (const project of projects) {
    // ─── Enforce dataSource state ──────────────────────────────────────
    if (project.dataSource === 'NO_CREDS') {
      // No credentials at all — skip entirely, no records written
      console.log(`[CRON] Skipping project "${project.name}" (NO_CREDS)`);
      continue;
    }

    try {
      let projectRecords: any[] = [];

      if (project.dataSource === 'LIVE' && project.platformTokens.length > 0) {
        // ─── LIVE: collect from each active platform token ────────────────
        for (const pt of project.platformTokens) {
          try {
            let plainToken: string;
            try {
              plainToken = decryptToken(pt.encryptedToken);
            } catch (decErr: any) {
              console.error(`[CRON] Cannot decrypt token for project "${project.name}" / ${pt.platform}: ${decErr.message}`);
              continue;
            }

            const records = await withRetry(
              () => collectFromPlatform({ platform: pt.platform, decryptedToken: plainToken, projectSlug: pt.projectSlug || undefined }),
              `${project.name}/${pt.platform}`
            );

            // Update verification timestamp on success
            await prisma.platformToken.update({
              where: { id: pt.id },
              data: { lastVerifiedAt: new Date(), lastError: null, failCount: 0 },
            });

            projectRecords.push(...records);
          } catch (err) {
            if (err instanceof PlatformAuthError) {
              // Auth failure: mark token INVALID, notify project owner, stop collection for this token
              console.error(`[CRON] Auth failure for "${project.name}" / ${pt.platform} — marking INVALID:`, (err as Error).message);
              await prisma.platformToken.update({
                where: { id: pt.id },
                data: {
                  status: 'INVALID',
                  lastError: (err as Error).message,
                  failCount: { increment: 1 },
                },
              });
              // Reset dataSource to NO_CREDS if no active tokens remain
              const activeCount = await prisma.platformToken.count({
                where: { projectId: project.id, status: 'ACTIVE' },
              });
              if (activeCount === 0) {
                await prisma.project.update({ where: { id: project.id }, data: { dataSource: 'NO_CREDS' } });
              }
              // Create in-app notification for the project owner
              await prisma.userNotification.create({
                data: {
                  userId: project.userId,
                  title: `${pt.platform} Token Expired or Revoked`,
                  body: `Your ${pt.platform} token for project "${project.name}" is no longer valid. Reconnect it in the project settings to resume live carbon tracking.`,
                  type: 'CREDENTIAL_ALERT',
                  data: { projectId: project.id, platform: pt.platform },
                },
              });
              // IMPORTANT: no mock fallback — just skip this token
            } else {
              // All 3 retries exhausted — log and skip, don't write bad data
              console.error(`[CRON] All retries failed for "${project.name}" / ${pt.platform}:`, (err as Error).message);
              await prisma.platformToken.update({
                where: { id: pt.id },
                data: { lastError: (err as Error).message, failCount: { increment: 1 } },
              });
            }
          }
        }
      } else if (project.dataSource === 'MOCK_DEMO') {
        // ─── MOCK_DEMO: run mock collector, records are tagged as demo ────
        const mockResult = await runCollector(true);
        projectRecords = mockResult.records;
      } else {
        // LIVE but no active tokens — shouldn't normally happen (dataSource would be NO_CREDS)
        console.warn(`[CRON] Project "${project.name}" is LIVE but has no active platform tokens. Skipping.`);
        continue;
      }

      if (projectRecords.length === 0) continue;

      // Create AgentRun record for this project's collection
      const collectorRun = await prisma.agentRun.create({
        data: {
          projectId: project.id,
          agentType: 'COLLECTOR',
          status: 'RUNNING',
          triggeredBy: 'cron',
        },
      });

      await prisma.emissionRecord.createMany({
        data: projectRecords.map(r => ({
          agentRunId: collectorRun.id,
          projectId: project.id,
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
          summary: `Collected ${projectRecords.length} records for "${project.name}" [${project.dataSource}]`,
          details: { source: project.dataSource, instanceCount: projectRecords.length },
          recordsProcessed: projectRecords.length,
          completedAt: new Date(),
          durationMs: Date.now() - startTime,
        },
      });

      allRecords.push(...projectRecords);
      console.log(`[CRON] Collected ${projectRecords.length} records for "${project.name}" [${project.dataSource}]`);

    } catch (projectErr) {
      // Isolation: one project failing doesn't abort other projects
      console.error(`[CRON] Unexpected error processing project "${project.name}":`, (projectErr as Error).message);
    }
  }

  if (allRecords.length === 0) {
    console.log('[CRON] No records collected this run.');
    return;
  }

  // ─── Run Analyst across all collected records ──────────────────────────
  try {
    const analystRun = await prisma.agentRun.create({
      data: { agentType: 'ANALYST', status: 'RUNNING', triggeredBy: 'cron' },
    });

    const analystResult = await runAnalyst(allRecords, NVIDIA_API_KEY);

    await prisma.agentRun.update({
      where: { id: analystRun.id },
      data: {
        status: 'SUCCESS',
        summary: analystResult.summary,
        details: {
          recommendations: analystResult.recommendations,
          totalSavingsKg: analystResult.totalSavingsKg,
        } as any,
        recordsProcessed: allRecords.length,
        completedAt: new Date(),
        durationMs: Date.now() - startTime,
      },
    });

    console.log(`[CRON] Analyst done: ${analystResult.summary}`);

    // ─── Agentic region switches — now reads from PlatformToken (new) first, falls back to legacy PlatformCredential ──
    const agenticProjects = projects.filter(p => p.agenticMode);
    for (const project of agenticProjects) {
      const migrationRec = analystResult.recommendations.find(r => r.recommendedAction === 'MIGRATE_REGION');
      if (!migrationRec) continue;
      console.log(`[CRON] Agentic Action: Enacting region switch for project ${project.name}...`);
      try {
        // Prefer PlatformToken (new, encrypted) over PlatformCredential (legacy, plaintext)
        const platformCreds = project.platformTokens.length > 0
          ? project.platformTokens
              .filter(pt => pt.status === 'ACTIVE')
              .map(pt => ({
                provider: pt.platform,
                token: (() => { try { return decryptToken(pt.encryptedToken); } catch { return ''; } })()
              }))
              .filter(c => c.token)
          : project.platformCredentials.map(c => ({ provider: c.provider, token: c.token }));

        const result = await enactRegionSwitch(
          project.id,
          project.name,
          migrationRec,
          platformCreds
        );
        console.log(`[CRON] Platform action result:`, result.message);
      } catch (e) {
        console.error(`[CRON] Failed to enact platform action for ${project.name}:`, e);
      }
    }
  } catch (error) {
    console.error('[CRON] Analyst pipeline failed:', (error as Error).message);
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
