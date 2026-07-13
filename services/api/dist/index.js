"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const carbon_routes_1 = __importDefault(require("./modules/carbon/carbon.routes"));
const reference_routes_1 = __importDefault(require("./modules/reference/reference.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const agents_routes_1 = __importDefault(require("./modules/agents/agents.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const connect_routes_1 = __importDefault(require("./modules/connect/connect.routes"));
const agents_1 = require("@carbonix/agents");
const agents_2 = require("@carbonix/agents");
const agents_3 = require("@carbonix/agents");
const prisma_1 = require("./lib/prisma");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 4000;
const USE_MOCK = process.env.USE_MOCK_AGENTS !== 'false';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express_1.default.json());
app.use((req, res, next) => { console.log('[API REQUEST]', req.method, req.url, req.headers.authorization ? 'HasAuth' : 'NoAuth'); const oldSend = res.send.bind(res); res.send = function (data) { console.log('[API RESPONSE]', res.statusCode, data); return oldSend(data); }; next(); });
app.get('/api/v1/health', (req, res) => {
    res.json({ message: 'CarboniX API is running!', agents: true, mockMode: USE_MOCK });
});
app.use('/api/v1/carbon', carbon_routes_1.default);
app.use('/api/v1/reference', reference_routes_1.default);
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/agents', agents_routes_1.default);
app.use('/api/v1/admin', admin_routes_1.default);
app.use('/api/v1/connect', connect_routes_1.default);
app.post('/api/v1/public/accept-invite', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ error: 'Email is required' });
        await prisma_1.prisma.teamMember.updateMany({
            where: { email, status: 'PENDING' },
            data: { status: 'ACTIVE' }
        });
        res.json({ success: true, message: 'Invitation accepted!' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// ─── Agent Cron Scheduling ───────────────────────────────────
// Run Collector + Analyst every hour
node_cron_1.default.schedule('0 * * * *', async () => {
    console.log('[CRON] Running Collector + Analyst agents...');
    try {
        const startTime = Date.now();
        // 1. Run Collector
        const collectorRun = await prisma_1.prisma.agentRun.create({
            data: { agentType: 'COLLECTOR', status: 'RUNNING', triggeredBy: 'cron' },
        });
        const collectorResult = await (0, agents_1.runCollector)(USE_MOCK);
        await prisma_1.prisma.emissionRecord.createMany({
            data: collectorResult.records.map(r => ({
                agentRunId: collectorRun.id,
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
        await prisma_1.prisma.agentRun.update({
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
        const analystRun = await prisma_1.prisma.agentRun.create({
            data: { agentType: 'ANALYST', status: 'RUNNING', triggeredBy: 'cron' },
        });
        const analystResult = await (0, agents_2.runAnalyst)(collectorResult.records, GEMINI_API_KEY);
        await prisma_1.prisma.agentRun.update({
            where: { id: analystRun.id },
            data: {
                status: 'SUCCESS',
                summary: analystResult.summary,
                details: {
                    recommendations: analystResult.recommendations,
                    totalSavingsKg: analystResult.totalSavingsKg,
                },
                recordsProcessed: collectorResult.records.length,
                completedAt: new Date(),
                durationMs: Date.now() - startTime,
            },
        });
        console.log(`[CRON] Analyst done: ${analystResult.summary}`);
    }
    catch (error) {
        console.error('[CRON] Agent pipeline failed:', error.message);
    }
});
// Run Reporter on the 1st of every month at midnight
node_cron_1.default.schedule('0 0 1 * *', async () => {
    console.log('[CRON] Running monthly Reporter agent...');
    try {
        const records = await prisma_1.prisma.emissionRecord.findMany({
            orderBy: { timestamp: 'desc' },
            take: 100,
        });
        const reporterRun = await prisma_1.prisma.agentRun.create({
            data: { agentType: 'REPORTER', status: 'RUNNING', triggeredBy: 'cron' },
        });
        const result = await (0, agents_3.runReporter)(records.map(r => ({
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
        await prisma_1.prisma.agentRun.update({
            where: { id: reporterRun.id },
            data: {
                status: 'SUCCESS',
                summary: result.summary,
                details: result.report,
                recordsProcessed: records.length,
                completedAt: new Date(),
            },
        });
        console.log(`[CRON] Reporter done: ${result.summary}`);
    }
    catch (error) {
        console.error('[CRON] Reporter failed:', error.message);
    }
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Agent mock mode: ${USE_MOCK ? 'ON (static data)' : 'OFF (live CloudWatch)'}`);
    console.log(`Cron: Collector+Analyst every hour, Reporter on 1st of month`);
});
// Trigger restart
// Trigger restart 2
