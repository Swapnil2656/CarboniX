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
    const { projectId, platform, token, projectSlug, deploymentId, deploymentLabel, deploymentRole } = req.body as {
      projectId?: string;
      platform?: string;
      token?: string;
      projectSlug?: string;
      // Optional: if provided, attach this token to a specific existing deployment
      // If omitted, creates a new Deployment and attaches to it
      deploymentId?: string;
      deploymentLabel?: string;
      deploymentRole?: string;
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

    // Create a new PlatformToken row (never upsert — unique constraint removed to support
    // multi-deployment: two Render deployments on the same project each get their own token row)
    const newToken = await prisma.platformToken.create({
      data: {
        projectId,
        platform: platform as any,
        encryptedToken,
        projectSlug: projectSlug || null,
        status: 'ACTIVE',
        lastVerifiedAt: new Date(),
        lastError: null,
        failCount: 0,
      },
    });

    // Attach to the specified deployment (if provided), otherwise create a new one
    let targetDeploymentId = deploymentId;
    if (targetDeploymentId) {
      // Attach to existing deployment — verify it belongs to this project
      const existingDeployment = await prisma.deployment.findFirst({
        where: { id: targetDeploymentId, projectId },
      });
      if (!existingDeployment) {
        await prisma.platformToken.delete({ where: { id: newToken.id } });
        return res.status(404).json({ success: false, error: 'Deployment not found for this project.' });
      }
      // If the deployment already has a token, reject to avoid silent overwrite
      if (existingDeployment.platformTokenId) {
        await prisma.platformToken.delete({ where: { id: newToken.id } });
        return res.status(409).json({
          success: false,
          error: 'This deployment already has a platform token attached. Revoke it first, then reconnect.',
        });
      }
      await prisma.deployment.update({
        where: { id: targetDeploymentId },
        data: { platformTokenId: newToken.id, isDeployed: true },
      });
    } else {
      // No deploymentId provided — create a new Deployment for this token
      const newDeployment = await prisma.deployment.create({
        data: {
          projectId,
          role: (deploymentRole as any) ?? 'OTHER',
          label: deploymentLabel ?? null,
          provider: null,   // will be populated by collector on first run
          isDeployed: true,
          platformTokenId: newToken.id,
        },
      });
      targetDeploymentId = newDeployment.id;
      console.log(`[CONNECT] Created new Deployment ${newDeployment.id} for ${platform} token on project ${projectId}.`);
    }

    // Set project dataSource to LIVE
    await prisma.project.update({
      where: { id: projectId },
      data: { dataSource: 'LIVE' },
    });

    console.log(`[CONNECT] ✓ ${platform} token verified and saved for project "${project.name}" (${projectId}). dataSource = LIVE.`);

    return res.json({
      success: true,
      platform,
      deploymentId: targetDeploymentId,
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
    const { projectId, deploymentId } = req.query as { projectId?: string; deploymentId?: string };

    if (!projectId || !platform) {
      return res.status(400).json({ success: false, error: 'Missing projectId query param or platform route param.' });
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Forbidden.' });
    }

    if (deploymentId) {
      // Deployment-scoped revoke: only remove the token attached to this specific deployment
      // Avoids deleting all Render tokens when the user only wants to disconnect one of two Render deployments
      const deployment = await prisma.deployment.findFirst({
        where: { id: deploymentId, projectId },
        include: { platformToken: true },
      });
      if (!deployment) {
        return res.status(404).json({ success: false, error: 'Deployment not found.' });
      }
      if (deployment.platformToken) {
        await prisma.platformToken.delete({ where: { id: deployment.platformToken.id } });
        // Null out the deployment's token reference
        await prisma.deployment.update({
          where: { id: deploymentId },
          data: { platformTokenId: null },
        });
      }
    } else {
      // Legacy: project+platform scoped — deletes ALL tokens for this platform on this project
      // (preserved for backward compat with existing call sites that don't yet know the deploymentId)
      await prisma.platformToken.deleteMany({
        where: { projectId, platform: platform as any },
      });
    }

    // Check if any active tokens remain across all deployments for this project
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
      const metadata = platformRegistry.getMetadata(p);
      
      return {
        id: p,
        name: metadata?.displayName || (p.charAt(0) + p.slice(1).toLowerCase()),
        icon: metadata?.icon || 'cloud',
        description: `Connect via ${p} Access Token`,
        docsUrl: metadata?.docsUrl || '#',
        needsProjectSlug: p !== 'RAILWAY' && p !== 'RENDER', // Special casing this since it's not strictly metadata for the platform UI per se, or we could add it to metadata later
        category: metadata?.category || 'BACKEND',
        regionSwitchSupport: metadata?.regionSwitchSupport || 'NOT_SUPPORTED',
      };
    });

    return res.status(200).json({ success: true, data: platforms });
  } catch (error: any) {
    console.error('[GET_PLATFORMS] Error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
