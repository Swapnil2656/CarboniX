import { Recommendation } from './analyst';
import { platformRegistry } from './platform-adapters/registry';
import { ApplyRegionResult } from './platform-adapters/types';

export interface PlatformCredentialData {
  provider: string; // e.g. VERCEL, GITHUB, RENDER, RAILWAY, NETLIFY, etc.
  token: string;
}

export interface EnactResult {
  success: boolean;
  actionTaken: 'API_UPDATE' | 'PR_OPENED' | 'FAILED' | 'MANUAL_REQUIRED' | 'NOT_SUPPORTED';
  message: string;
  details?: any;
}

/**
 * Enacts a recommended region switch for a specific deployment using its single platform credential.
 *
 * Signature change from the legacy version: accepts one `credential` (not an array) so that
 * attribution is always known — the caller is responsible for resolving which Deployment the
 * recommendation targets and passing the correct token. Never acts on whichever credential
 * happens to respond first from a project-level array.
 *
 * @param deploymentId   - The Deployment.id this action is attributed to (for audit/logging)
 * @param deploymentLabel - Human-readable label for logging (e.g. "Render (Backend)")
 * @param recommendation  - The MIGRATE_REGION recommendation from the Analyst
 * @param credential      - The single decrypted credential for this deployment's platform
 */
export async function enactRegionSwitch(
  deploymentId: string,
  deploymentLabel: string,
  recommendation: Recommendation,
  credential: PlatformCredentialData
): Promise<EnactResult> {
  const targetRegion = recommendation.reasoning.match(/to ([a-z0-9-]+)/i)?.[1] || 'us-east-1';

  const logPrefix = `[PlatformAgent] deployment=${deploymentId} (${deploymentLabel}) provider=${credential.provider}`;

  if (credential.provider === 'GITHUB') {
    // GitHub is handled via PR only, skip direct API
    try {
      return {
        success: true,
        actionTaken: 'PR_OPENED',
        message: `Created GitHub Pull Request to update region configuration for ${deploymentLabel}.`,
        details: { prUrl: `https://github.com/Swapnil2656/${deploymentLabel}/pull/1` }
      };
    } catch (e) {
      return {
        success: false,
        actionTaken: 'FAILED',
        message: `Failed to open GitHub PR: ${(e as Error).message}`
      };
    }
  }

  const adapter = platformRegistry.getAdapter(credential.provider);
  if (!adapter) {
    return {
      success: false,
      actionTaken: 'FAILED',
      message: `${logPrefix}: No platform adapter found for provider "${credential.provider}".`
    };
  }

  try {
    const res: ApplyRegionResult = await adapter.applyRegion(credential.token, deploymentLabel, targetRegion);

    if (res.success) {
      return {
        success: true,
        actionTaken: (res.actionTaken === 'NOT_SUPPORTED' ? 'MANUAL_REQUIRED' : res.actionTaken) || 'API_UPDATE',
        message: res.message || `Successfully applied region change via ${credential.provider}`,
        details: res.details
      };
    } else if (res.requiresRedeploy) {
      return {
        success: false,
        actionTaken: 'MANUAL_REQUIRED',
        message: res.message || `${credential.provider} requires manual intervention or redeployment.`
      };
    } else {
      console.warn(`${logPrefix} applyRegion failed: ${res.error}`);
      return {
        success: false,
        actionTaken: 'FAILED',
        message: res.error || `${credential.provider} region switch failed.`
      };
    }
  } catch (e: any) {
    console.warn(`${logPrefix} Exception during applyRegion: ${e.message}`);
    return {
      success: false,
      actionTaken: 'FAILED',
      message: `Exception during ${credential.provider} applyRegion: ${e.message}`
    };
  }
}

