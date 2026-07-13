"use strict";
/**
 * CarboniX Agent Controller
 *
 * Handles all agent-related API requests: triggering agents,
 * fetching agent runs, and retrieving emission data.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerOrchestrator = exports.getLatestBRSR = exports.getEmissions = exports.triggerReporter = exports.runGate = exports.triggerAnalyst = exports.triggerCollector = exports.getAgentRun = exports.listAgentRuns = void 0;
const prisma_1 = require("../../lib/prisma");
const agents_1 = require("@carbonix/agents");
const agents_2 = require("@carbonix/agents");
const agents_3 = require("@carbonix/agents");
const agents_4 = require("@carbonix/agents");
const agents_5 = require("@carbonix/agents");
const USE_MOCK = process.env.USE_MOCK_AGENTS !== 'false';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const CARBON_BUDGET = parseFloat(process.env.CARBON_BUDGET_KG_DAY || '10');
/**
 * GET /api/v1/agents/runs — List recent agent runs (feed)
 */
const listAgentRuns = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        const offset = parseInt(req.query.offset) || 0;
        const agentType = req.query.type;
        const where = agentType ? { agentType: agentType } : {};
        const runs = await prisma_1.prisma.agentRun.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset,
        });
        const total = await prisma_1.prisma.agentRun.count({ where });
        res.json({
            success: true,
            data: runs,
            pagination: { total, limit, offset },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.listAgentRuns = listAgentRuns;
/**
 * GET /api/v1/agents/runs/:id — Get details of a specific run
 */
const getAgentRun = async (req, res) => {
    try {
        const run = await prisma_1.prisma.agentRun.findUnique({
            where: { id: req.params.id },
        });
        if (!run) {
            return res.status(404).json({ success: false, error: 'Agent run not found' });
        }
        res.json({ success: true, data: run });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.getAgentRun = getAgentRun;
/**
 * POST /api/v1/agents/trigger/collector — Manually trigger Collector Agent
 */
const triggerCollector = async (req, res) => {
    try {
        const startTime = Date.now();
        // Create the AgentRun record
        const agentRun = await prisma_1.prisma.agentRun.create({
            data: {
                agentType: 'COLLECTOR',
                status: 'RUNNING',
                triggeredBy: 'manual',
            },
        });
        // Run the collector
        const result = await (0, agents_1.runCollector)(USE_MOCK);
        // Persist emission records
        const createdRecords = await prisma_1.prisma.emissionRecord.createMany({
            data: result.records.map(r => ({
                agentRunId: agentRun.id,
                instanceId: r.instanceId,
                instanceType: r.instanceType,
                provider: r.provider,
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
        await prisma_1.prisma.agentRun.update({
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.triggerCollector = triggerCollector;
/**
 * POST /api/v1/agents/trigger/analyst — Manually trigger Analyst Agent
 */
const triggerAnalyst = async (req, res) => {
    try {
        const startTime = Date.now();
        // Get latest emission records
        const latestCollectorRun = await prisma_1.prisma.agentRun.findFirst({
            where: { agentType: 'COLLECTOR', status: 'SUCCESS' },
            orderBy: { createdAt: 'desc' },
        });
        if (!latestCollectorRun) {
            return res.status(400).json({
                success: false,
                error: 'No collector data found. Run the Collector Agent first.',
            });
        }
        const records = await prisma_1.prisma.emissionRecord.findMany({
            where: { agentRunId: latestCollectorRun.id },
        });
        // Create AgentRun
        const agentRun = await prisma_1.prisma.agentRun.create({
            data: {
                agentType: 'ANALYST',
                status: 'RUNNING',
                triggeredBy: 'manual',
            },
        });
        // Run the analyst
        const result = await (0, agents_2.runAnalyst)(records.map(r => ({
            instanceId: r.instanceId,
            instanceType: r.instanceType,
            instanceName: r.instanceName || r.instanceId,
            provider: r.provider,
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
        })), GEMINI_API_KEY);
        // Update recommendations on the emission records
        for (const rec of result.recommendations) {
            await prisma_1.prisma.emissionRecord.updateMany({
                where: { instanceId: rec.instanceId, agentRunId: latestCollectorRun.id },
                data: { recommendation: rec.reasoning },
            });
        }
        // Update the AgentRun
        const durationMs = Date.now() - startTime;
        await prisma_1.prisma.agentRun.update({
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.triggerAnalyst = triggerAnalyst;
/**
 * POST /api/v1/agents/gate — Run CI/CD Gate on a diff
 */
const runGate = async (req, res) => {
    try {
        const { diff, budget } = req.body;
        if (!diff) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field: diff (infrastructure diff string)',
            });
        }
        const startTime = Date.now();
        const agentRun = await prisma_1.prisma.agentRun.create({
            data: {
                agentType: 'CICD_GATE',
                status: 'RUNNING',
                triggeredBy: 'webhook',
            },
        });
        const result = await (0, agents_3.runGateAgent)(diff, budget || CARBON_BUDGET);
        const durationMs = Date.now() - startTime;
        await prisma_1.prisma.agentRun.update({
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.runGate = runGate;
/**
 * POST /api/v1/agents/trigger/reporter — Manually trigger Reporter Agent
 */
const triggerReporter = async (req, res) => {
    try {
        const startTime = Date.now();
        // Get all emission records (from latest collector run or all recent)
        const records = await prisma_1.prisma.emissionRecord.findMany({
            orderBy: { timestamp: 'desc' },
            take: 100,
        });
        if (records.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No emission records found. Run the Collector Agent first.',
            });
        }
        const agentRun = await prisma_1.prisma.agentRun.create({
            data: {
                agentType: 'REPORTER',
                status: 'RUNNING',
                triggeredBy: 'manual',
            },
        });
        const result = await (0, agents_4.runReporter)(records.map(r => ({
            instanceId: r.instanceId,
            instanceType: r.instanceType,
            instanceName: r.instanceName || r.instanceId,
            provider: r.provider,
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
        })));
        const durationMs = Date.now() - startTime;
        await prisma_1.prisma.agentRun.update({
            where: { id: agentRun.id },
            data: {
                status: 'SUCCESS',
                summary: result.summary,
                details: result.report,
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.triggerReporter = triggerReporter;
/**
 * GET /api/v1/agents/emissions — Get latest emission records
 */
const getEmissions = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);
        const records = await prisma_1.prisma.emissionRecord.findMany({
            orderBy: { timestamp: 'desc' },
            take: limit,
        });
        res.json({ success: true, data: records });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.getEmissions = getEmissions;
/**
 * GET /api/v1/agents/report/brsr — Get latest BRSR report
 */
const getLatestBRSR = async (req, res) => {
    try {
        const latestReport = await prisma_1.prisma.agentRun.findFirst({
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.getLatestBRSR = getLatestBRSR;
/**
 * POST /api/v1/agents/trigger/orchestrator — Execute Blue/Green migrations
 *
 * Fetches the latest Analyst Agent recommendations from the DB and passes
 * all MIGRATE_REGION candidates (or top HIGH-priority ones) to the
 * Orchestrator Agent for zero-downtime Blue/Green migration execution.
 */
const triggerOrchestrator = async (req, res) => {
    const startTime = Date.now();
    try {
        // ── Step 1: Create an AgentRun record ────────────────────────────────
        const agentRun = await prisma_1.prisma.agentRun.create({
            data: {
                agentType: 'ORCHESTRATOR',
                status: 'RUNNING',
                triggeredBy: req.user?.id ? 'manual' : 'api',
            },
        });
        // ── Step 2: Fetch latest Analyst recommendations from DB ─────────────
        const latestAnalystRun = await prisma_1.prisma.agentRun.findFirst({
            where: { agentType: 'ANALYST', status: 'SUCCESS' },
            orderBy: { createdAt: 'desc' },
        });
        if (!latestAnalystRun || !latestAnalystRun.details) {
            await prisma_1.prisma.agentRun.update({
                where: { id: agentRun.id },
                data: {
                    status: 'FAILED',
                    errorMessage: 'No successful Analyst run found. Run the Analyst Agent first.',
                    completedAt: new Date(),
                    durationMs: Date.now() - startTime,
                },
            });
            return res.status(400).json({
                success: false,
                error: 'No Analyst recommendations available. Run /trigger/analyst first.',
            });
        }
        const details = latestAnalystRun.details;
        const recommendations = details.recommendations || [];
        if (recommendations.length === 0) {
            await prisma_1.prisma.agentRun.update({
                where: { id: agentRun.id },
                data: {
                    status: 'SUCCESS',
                    summary: 'No recommendations to migrate. All instances are within acceptable thresholds.',
                    recordsProcessed: 0,
                    completedAt: new Date(),
                    durationMs: Date.now() - startTime,
                },
            });
            return res.json({ success: true, data: { message: 'Nothing to orchestrate.' } });
        }
        // ── Step 3: Run the Orchestrator (Blue/Green migrations) ─────────────
        const maxConcurrent = parseInt(req.body?.maxConcurrent) || 3;
        const result = await (0, agents_5.runOrchestrator)(recommendations, maxConcurrent);
        // ── Step 4: Persist the orchestration run ────────────────────────────
        await prisma_1.prisma.agentRun.update({
            where: { id: agentRun.id },
            data: {
                status: 'SUCCESS',
                summary: result.summary,
                details: result,
                recordsProcessed: result.totalMigrations,
                completedAt: new Date(),
                durationMs: Date.now() - startTime,
            },
        });
        res.json({
            success: true,
            data: {
                runId: agentRun.id,
                ...result,
                durationMs: Date.now() - startTime,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.triggerOrchestrator = triggerOrchestrator;
