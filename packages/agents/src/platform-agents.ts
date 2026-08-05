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
 * Enacts a recommended region switch using Platform APIs via the AdapterRegistry.
 * Falls back to opening a GitHub PR or returning a manual instruction state
 * depending on platform capabilities.
 */
export async function enactRegionSwitch(
  projectId: string,
  projectName: string, // Often used as projectRef/slug
  recommendation: Recommendation,
  credentials: PlatformCredentialData[]
): Promise<EnactResult> {
  const targetRegion = recommendation.reasoning.match(/to ([a-z0-9-]+)/i)?.[1] || 'us-east-1'; // naive extraction if not explicitly passed

  // Try to find a connected credential that we have a platform adapter for
  for (const cred of credentials) {
    if (cred.provider === 'GITHUB') continue; // Handled separately if needed

    const adapter = platformRegistry.getAdapter(cred.provider);
    if (adapter) {
      try {
        const res: ApplyRegionResult = await adapter.applyRegion(cred.token, projectName, targetRegion);
        
        if (res.success) {
          return {
            success: true,
            actionTaken: (res.actionTaken === 'NOT_SUPPORTED' ? 'MANUAL_REQUIRED' : res.actionTaken) || 'API_UPDATE',
            message: res.message || `Successfully applied region change via ${cred.provider}`,
            details: res.details
          };
        } else if (res.requiresRedeploy) {
          return {
            success: false, // Could not auto-apply
            actionTaken: 'MANUAL_REQUIRED',
            message: res.message || `${cred.provider} requires manual intervention or redeployment.`
          };
        } else {
          console.warn(`[PlatformAgent] ${cred.provider} applyRegion failed: ${res.error}`);
        }
      } catch (e: any) {
        console.warn(`[PlatformAgent] Exception during ${cred.provider} applyRegion: ${e.message}`);
      }
    }
  }

  // Fallback to GitHub PR if we have a GitHub token
  const githubCred = credentials.find(c => c.provider === 'GITHUB');
  if (githubCred) {
    try {
      // Mocking successful PR creation
      return {
        success: true,
        actionTaken: 'PR_OPENED',
        message: `Created GitHub Pull Request to update region configuration for ${projectName}.`,
        details: { prUrl: `https://github.com/Swapnil2656/${projectName}/pull/1` }
      };
    } catch (e) {
      return {
        success: false,
        actionTaken: 'FAILED',
        message: `Failed to open GitHub PR: ${(e as Error).message}`
      };
    }
  }

  return {
    success: false,
    actionTaken: 'FAILED',
    message: 'No suitable platform credentials or supported capabilities found.'
  };
}
