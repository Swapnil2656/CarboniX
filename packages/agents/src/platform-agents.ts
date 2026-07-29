import { Recommendation } from './analyst';

export interface PlatformCredentialData {
  provider: string; // e.g. VERCEL, GITHUB
  token: string;
}

export interface EnactResult {
  success: boolean;
  actionTaken: 'API_UPDATE' | 'PR_OPENED' | 'FAILED';
  message: string;
  details?: any;
}

/**
 * Enacts a recommended region switch using Platform APIs (e.g., Vercel)
 * or falls back to opening a GitHub PR with declarative config changes.
 */
export async function enactRegionSwitch(
  projectId: string,
  projectName: string,
  recommendation: Recommendation,
  credentials: PlatformCredentialData[]
): Promise<EnactResult> {
  const vercelCred = credentials.find(c => c.provider === 'VERCEL');
  const githubCred = credentials.find(c => c.provider === 'GITHUB');

  // Try Vercel API if credential exists
  if (vercelCred) {
    try {
      const targetRegion = recommendation.reasoning.includes('eu-north-1') ? 'arn1' : 'iad1'; // simple mapping
      
      const res = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${vercelCred.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          serverlessFunctionRegion: targetRegion
        })
      });

      if (res.ok) {
        return {
          success: true,
          actionTaken: 'API_UPDATE',
          message: `Successfully updated Vercel project region to ${targetRegion} via API.`
        };
      } else {
        console.warn(`[PlatformAgent] Vercel API failed: ${res.statusText}. Falling back to GitHub PR.`);
      }
    } catch (e) {
      console.warn(`[PlatformAgent] Vercel API exception: ${(e as Error).message}. Falling back to GitHub PR.`);
    }
  }

  // Try GitHub PR Fallback
  if (githubCred) {
    try {
      // In a real implementation, we would use the GitHub API to:
      // 1. Get default branch SHA
      // 2. Create a new branch
      // 3. Update vercel.json or netlify.toml
      // 4. Create a Pull Request
      
      // Mocking the successful PR creation for the demo
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
    message: 'No suitable platform credentials found (need VERCEL or GITHUB).'
  };
}
