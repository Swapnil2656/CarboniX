import { Request, Response } from 'express';
import { createHash } from 'crypto';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../../middleware/auth.middleware';
import { encryptToken } from '../../lib/platformTokenService';
import { platformRegistry } from '@carbonix/agents';


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

export async function handleConnect(req: Request, res: Response) {
  try {
    const {
      apiKey,
      sdkVersion,
      nodeModulesHasSdk,   // boolean: does node_modules/@carbonix/sdk exist?
      sdkConfigExists,     // boolean: does carbonix.config.js / .carbonixrc exist?
      configFileName,      // string: which config file was found (for logging)
      environment,         // 'localhost' | 'production' | 'ci'
      region,              // string (optional)
      provider,            // 'AWS' | 'GCP' | 'AZURE' (optional)
    } = req.body;

    // ── 1. Validate required fields ──────────────────────────────────────────
    if (!apiKey || nodeModulesHasSdk === undefined || sdkConfigExists === undefined) {
      return res.status(400).json({ success: false, error: ERROR_CODES.MISSING_FIELDS });
    }

    // ── 2. Validate API key ──────────────────────────────────────────────────
    const hashedKey = createHash('sha256').update(apiKey).digest('hex');
    const keyRecord = await prisma.apiKey.findUnique({
      where: { hashedKey },
    });

    if (!keyRecord || keyRecord.status !== 'ACTIVE') {
      return res.status(401).json({ success: false, error: ERROR_CODES.INVALID_KEY });
    }

    // ── 3. Find the associated project ──────────────────────────────────────
    // The API key is scoped to a user, so we try finding project by name first or exact match
    let project = null;
    if (req.body.projectName && typeof req.body.projectName === 'string') {
      project = await prisma.project.findFirst({
        where: {
          userId: keyRecord.createdBy,
          name: { equals: req.body.projectName.trim(), mode: 'insensitive' },
        },
      });
    }
    if (!project && keyRecord.name) {
      const derivedName = keyRecord.name.replace(/\s+(Default\s+)?Key$/i, '').trim();
      if (derivedName && derivedName !== keyRecord.name) {
        project = await prisma.project.findFirst({
          where: {
            userId: keyRecord.createdBy,
            name: { equals: derivedName, mode: 'insensitive' },
          },
        });
      }
    }
    if (!project) {
      project = await prisma.project.findFirst({
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
      console.info(
        `[CONNECT] Note: @carbonix/sdk not in node_modules for project ${project.id}. ` +
        'This is fine — SDK install is optional for dashboard-only monitoring.'
      );
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

    await prisma.project.update({
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
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: now, totalRequests: { increment: 1 } },
    });

    console.log(
      `[CONNECT] ✓ Project "${project.name}" (${project.id}) connected. ` +
      `SDK v${sdkVersion || 'unknown'}, env: ${environment}, config: ${configFileName || 'unknown'}`
    );

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

  } catch (error) {
    console.error('[CONNECT] Unexpected error:', (error as Error).message);
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

// ─── Platform Token Connect ───────────────────────────────────────────────────────

/**
 * POST /api/v1/connect/platform-token
 *
 * Body: { projectId, platform: 'VERCEL'|'NETLIFY'|'RAILWAY'|'RENDER', token, projectSlug? }
 *
 * 1. Verifies the token is valid against the platform API (fast, read-only call)
 * 2. If valid: encrypts and upserts into PlatformToken, sets dataSource = LIVE
 * 3. If invalid: returns a specific error — never saves an invalid token
 */
export async function handleConnectPlatformToken(req: AuthRequest, res: Response) {
  try {
    const { projectId, platform, token, projectSlug } = req.body as {
      projectId?: string;
      platform?: string;
      token?: string;
      projectSlug?: string;
    };

    if (!projectId || !platform || !token) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: projectId, platform, token',
      });
    }

    const adapter = platformRegistry.getAdapter(platform);
    if (!adapter) {
      return res.status(400).json({
        success: false,
        error: `Unsupported platform "${platform}". Allowed: ${platformRegistry.getAllPlatforms().join(', ')}`,
      });
    }

    // Authorization: confirm the project belongs to the current user
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Forbidden: project not found or access denied.' });
    }

    // Verify the token against the real platform API before saving anything
    console.log(`[CONNECT] Verifying ${platform} token for project ${projectId}...`);
    const verifyResult = await adapter.verifyToken(token, projectSlug);

    if (!verifyResult.valid) {
      return res.status(422).json({
        success: false,
        error: verifyResult.error || 'Token verification failed.',
      });
    }

    // Encrypt the token before persisting
    let encryptedToken: string;
    try {
      encryptedToken = encryptToken(token);
    } catch (encErr: any) {
      console.error('[CONNECT] Encryption key missing or invalid:', encErr.message);
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: TOKEN_ENCRYPTION_KEY is not set. Contact the administrator.',
      });
    }

    // Upsert the platform token (one per project+platform combination)
    await prisma.platformToken.upsert({
      where: { projectId_platform: { projectId, platform: platform as any } },
      create: {
        projectId,
        platform: platform as any,
        encryptedToken,
        projectSlug: projectSlug || null,
        status: 'ACTIVE',
        lastVerifiedAt: new Date(),
        lastError: null,
        failCount: 0,
      },
      update: {
        encryptedToken,
        projectSlug: projectSlug || null,
        status: 'ACTIVE',
        lastVerifiedAt: new Date(),
        lastError: null,
        failCount: 0,
      },
    });

    // Set project dataSource to LIVE
    await prisma.project.update({
      where: { id: projectId },
      data: { dataSource: 'LIVE' },
    });

    console.log(`[CONNECT] ✓ ${platform} token verified and saved for project "${project.name}" (${projectId}). dataSource = LIVE.`);

    return res.json({
      success: true,
      platform,
      accountName: verifyResult.meta?.accountName,
      message: `${platform} account connected successfully. Real usage-based carbon data will be collected on the next hourly run.`,
    });

  } catch (error: any) {
    console.error('[CONNECT] handleConnectPlatformToken error:', error.message);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
}

// ─── Platform Token Revoke ──────────────────────────────────────────────────────

/**
 * DELETE /api/v1/connect/platform-token/:platform
 *
 * Revokes/removes a platform token for the specified project (query param: projectId).
 * If no active tokens remain, resets project.dataSource back to NO_CREDS.
 */
export async function handleRevokePlatformToken(req: AuthRequest, res: Response) {
  try {
    const { platform } = req.params;
    const { projectId } = req.query as { projectId?: string };

    if (!projectId || !platform) {
      return res.status(400).json({ success: false, error: 'Missing projectId query param or platform route param.' });
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Forbidden.' });
    }

    // Delete the token
    await prisma.platformToken.deleteMany({
      where: { projectId, platform: platform as any },
    });

    // Check if any active tokens remain
    const remaining = await prisma.platformToken.count({
      where: { projectId, status: 'ACTIVE' },
    });

    // If no active tokens left, reset dataSource to NO_CREDS
    if (remaining === 0) {
      await prisma.project.update({
        where: { id: projectId },
        data: { dataSource: 'NO_CREDS' },
      });
      console.log(`[CONNECT] All platform tokens removed for project ${projectId}. dataSource = NO_CREDS.`);
    }

    return res.json({
      success: true,
      message: `${platform} token revoked.${remaining === 0 ? ' Project data source reset to NO_CREDS.' : ''}`,
    });

  } catch (error: any) {
    console.error('[CONNECT] handleRevokePlatformToken error:', error.message);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
}

// ─── Platform Discovery ───────────────────────────────────────────────────────

export async function handleGetPlatforms(req: AuthRequest, res: Response) {
  try {
    const platforms = platformRegistry.getAllPlatforms().map(p => {
      let icon = 'cloud';
      let description = `Connect via ${p} Access Token`;
      let needsProjectSlug = true;
      let docsUrl = '#';

      if (p === 'VERCEL') { icon = 'change_history'; docsUrl = 'https://vercel.com/account/tokens'; }
      if (p === 'NETLIFY') { icon = 'diamond'; docsUrl = 'https://app.netlify.com/user/applications#personal-access-tokens'; }
      if (p === 'RAILWAY') { icon = 'train'; docsUrl = 'https://docs.railway.app/reference/public-api#project-tokens'; needsProjectSlug = false; }
      if (p === 'RENDER') { icon = 'cloud'; docsUrl = 'https://dashboard.render.com/user/settings#api-keys'; needsProjectSlug = false; }
      if (p === 'SUPABASE') { icon = 'database'; docsUrl = 'https://supabase.com/dashboard/account/tokens'; }

      return {
        id: p,
        name: p.charAt(0) + p.slice(1).toLowerCase(),
        icon,
        description,
        docsUrl,
        needsProjectSlug
      };
    });

    return res.status(200).json({ success: true, data: platforms });
  } catch (error: any) {
    console.error('[GET_PLATFORMS] Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
