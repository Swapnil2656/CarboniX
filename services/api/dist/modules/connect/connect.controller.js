"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnect = handleConnect;
const crypto_1 = require("crypto");
const prisma_1 = require("../../lib/prisma");
// ─── Error Codes ──────────────────────────────────────────────────────────────
// These are structured so the CLI can print clean, actionable error messages
// in the user's terminal.
const ERROR_CODES = {
    INVALID_KEY: {
        code: 'INVALID_KEY',
        message: 'Invalid API key. Please check your --key flag and try again.',
        hint: 'You can find your key in the CarboniX dashboard under API Keys.',
    },
    PROJECT_NOT_FOUND: {
        code: 'PROJECT_NOT_FOUND',
        message: 'No project found for this API key.',
        hint: 'Make sure you completed onboarding at https://carbonix.dev/onboarding.',
    },
    SDK_NOT_INSTALLED: {
        code: 'SDK_NOT_INSTALLED',
        message: 'CarboniX SDK package not found in node_modules.',
        hint: 'Run: npm install @carbonix/sdk',
    },
    SDK_NOT_INITIALIZED: {
        code: 'SDK_NOT_INITIALIZED',
        message: 'CarboniX SDK is not initialized in this project.',
        hint: 'A carbonix.config.js (or carbonix.config.ts / .carbonixrc) file must exist in the project root. ' +
            'Create one with: npx @carbonix/cli init --key <your-key>',
    },
    MISSING_FIELDS: {
        code: 'MISSING_FIELDS',
        message: 'Request is missing required fields.',
        hint: 'Ensure apiKey, nodeModulesHasSdk, and sdkConfigExists are provided.',
    },
};
// ─── Controller ───────────────────────────────────────────────────────────────
async function handleConnect(req, res) {
    try {
        const { apiKey, sdkVersion, nodeModulesHasSdk, // boolean: does node_modules/@carbonix/sdk exist?
        sdkConfigExists, // boolean: does carbonix.config.js / .carbonixrc exist?
        configFileName, // string: which config file was found (for logging)
        environment, // 'localhost' | 'production' | 'ci'
        region, // string (optional)
        provider, // 'AWS' | 'GCP' | 'AZURE' (optional)
         } = req.body;
        // ── 1. Validate required fields ──────────────────────────────────────────
        if (!apiKey || nodeModulesHasSdk === undefined || sdkConfigExists === undefined) {
            return res.status(400).json({ success: false, error: ERROR_CODES.MISSING_FIELDS });
        }
        // ── 2. Validate API key ──────────────────────────────────────────────────
        const hashedKey = (0, crypto_1.createHash)('sha256').update(apiKey).digest('hex');
        const keyRecord = await prisma_1.prisma.apiKey.findUnique({
            where: { hashedKey },
        });
        if (!keyRecord || keyRecord.status !== 'ACTIVE') {
            return res.status(401).json({ success: false, error: ERROR_CODES.INVALID_KEY });
        }
        // ── 3. Find the associated project ──────────────────────────────────────
        // The API key is scoped to a user, so we try finding project by name first or exact match
        let project = null;
        if (req.body.projectName && typeof req.body.projectName === 'string') {
            project = await prisma_1.prisma.project.findFirst({
                where: {
                    userId: keyRecord.createdBy,
                    name: { equals: req.body.projectName.trim(), mode: 'insensitive' },
                },
            });
        }
        if (!project && keyRecord.name) {
            const derivedName = keyRecord.name.replace(/\s+(Default\s+)?Key$/i, '').trim();
            if (derivedName && derivedName !== keyRecord.name) {
                project = await prisma_1.prisma.project.findFirst({
                    where: {
                        userId: keyRecord.createdBy,
                        name: { equals: derivedName, mode: 'insensitive' },
                    },
                });
            }
        }
        if (!project) {
            project = await prisma_1.prisma.project.findFirst({
                where: { userId: keyRecord.createdBy },
                orderBy: { createdAt: 'desc' },
            });
        }
        if (!project) {
            return res.status(404).json({ success: false, error: ERROR_CODES.PROJECT_NOT_FOUND });
        }
        // ── 4. SDK install is optional — log it but don't block ─────────────────
        // npm install @carbonix/sdk is only needed for programmatic SDK use.
        // The CLI + config file alone is sufficient for dashboard monitoring.
        if (!nodeModulesHasSdk) {
            console.info(`[CONNECT] Note: @carbonix/sdk not in node_modules for project ${project.id}. ` +
                'This is fine — SDK install is optional for dashboard-only monitoring.');
        }
        // ── 5. Validate SDK is properly initialized (config file exists) ─────────
        if (!sdkConfigExists) {
            console.warn(`[CONNECT] SDK not initialized (no config file) for project ${project.id}`);
            return res.status(422).json({
                success: false,
                error: ERROR_CODES.SDK_NOT_INITIALIZED,
                terminalOutput: [
                    '╔══════════════════════════════════════════════════════════════════╗',
                    '║  ✗ CarboniX SDK is not initialized                              ║',
                    '║                                                                  ║',
                    '║  Expected one of:                                                ║',
                    '║    carbonix.config.js   carbonix.config.ts   .carbonixrc        ║',
                    '║                                                                  ║',
                    '║  This file is automatically created by the init command.        ║',
                    '║  Re-run: npx @carbonix/cli init --key <your-key>                ║',
                    '╚══════════════════════════════════════════════════════════════════╝',
                ].join('\n'),
            });
        }
        // ── 6. All checks passed — mark project as connected ────────────────────
        const wasAlreadyConnected = project.sdkConnected;
        const now = new Date();
        await prisma_1.prisma.project.update({
            where: { id: project.id },
            data: {
                sdkConnected: true,
                lastPingAt: now,
                connectedAt: wasAlreadyConnected ? project.connectedAt : now,
                isDeployed: environment !== 'localhost',
                ...(region ? { region } : environment === 'localhost' && !project.region ? { region: 'localhost (pre-deployment)' } : {}),
                ...(provider ? { provider: provider.toUpperCase() } : {}),
            },
        });
        // Update API key last used
        await prisma_1.prisma.apiKey.update({
            where: { id: keyRecord.id },
            data: { lastUsedAt: now, totalRequests: { increment: 1 } },
        });
        console.log(`[CONNECT] ✓ Project "${project.name}" (${project.id}) connected. ` +
            `SDK v${sdkVersion || 'unknown'}, env: ${environment}, config: ${configFileName || 'unknown'}`);
        return res.json({
            success: true,
            projectName: project.name,
            projectId: project.id,
            environment,
            isFirstConnection: !wasAlreadyConnected,
            message: wasAlreadyConnected
                ? `✓ CarboniX is active on project "${project.name}"`
                : `✓ CarboniX successfully connected to "${project.name}" for the first time!`,
            dashboardUrl: `https://carbonix.dev/admin/dashboard`,
            terminalOutput: [
                '╔══════════════════════════════════════════════════════╗',
                `║  ✓ Connected to CarboniX${wasAlreadyConnected ? ' (already active)' : ' — first connection!'}`,
                `║  Project: ${project.name}`,
                `║  Environment: ${environment || 'unknown'}`,
                `║  Config: ${configFileName || 'carbonix.config.js'}`,
                '║                                                      ║',
                '║  Open dashboard: https://carbonix.dev/dashboard     ║',
                '╚══════════════════════════════════════════════════════╝',
            ].join('\n'),
        });
    }
    catch (error) {
        console.error('[CONNECT] Unexpected error:', error.message);
        return res.status(500).json({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred. Please try again.',
                hint: 'If this persists, open an issue at https://github.com/carbonix/cli',
            },
        });
    }
}
