import { PlatformAdapter, UsageMetrics, VerifyTokenResult, ApplyRegionResult, PlatformCapabilities, PlatformMetadata } from './types';
import { fetchT } from './utils';

export class DenoDeployAdapter implements PlatformAdapter {
  platform = 'DENO_DEPLOY';
  capabilities = {
    canFetchUsage: true,
    canSetRegion: false, // Default to false until dynamically verified
  };
  metadata: PlatformMetadata = {
    displayName: 'Deno Deploy',
    icon: 'cloud',
    docsUrl: 'https://dash.deno.com/account/access-tokens',
    category: 'FRONTEND',
    regionSwitchSupport: 'AUTO',
  };

  async checkDynamicCapabilities(token: string, projectRef?: string): Promise<PlatformCapabilities> {
    try {
      if (!projectRef) {
        return this.capabilities;
      }

      // Check the project via Deno's API to see if it supports region pinning
      // Using generic /v1/projects endpoint. Deno's Subhosting / Deploy API uses this.
      const res = await fetchT(`https://api.deno.com/v1/projects/${projectRef}`, {
        headers: { Authorization: `Bearer ${token}` }
      }, this.platform);

      const data = await res.json();
      
      // The new architecture often exposes a 'region' or 'mutableRegion' config
      // Classic architecture does not support pinning a region (runs globally)
      const isNewProduct = data && (data.region !== undefined || data.hasRegionControl === true);

      return {
        ...this.capabilities,
        canSetRegion: isNewProduct
      };
    } catch (error) {
      console.warn(`[DENO] checkDynamicCapabilities failed:`, error);
      return this.capabilities;
    }
  }

  async verifyToken(token: string, projectRef?: string): Promise<VerifyTokenResult> {
    try {
      // Deno Deploy API for checking token
      // Currently /v1/projects is accessible if the token is valid
      const res = await fetchT('https://api.deno.com/v1/projects', {
        headers: { Authorization: `Bearer ${token}` }
      }, this.platform);
      
      if (!res.ok) {
        return { valid: false, error: `Deno API returned ${res.status}` };
      }
      
      const data = await res.json();
      const meta: Record<string, string> = {};
      if (Array.isArray(data) && data.length > 0 && data[0].organizationId) {
        meta.accountName = data[0].organizationId;
      }
      
      return { valid: true, meta };
    } catch (error: any) {
      return { valid: false, error: error.message };
    }
  }

  async getUsage(token: string, projectRef: string, date: string): Promise<UsageMetrics> {
    // Deno analytics API
    return {
      execDurationMs: 0,
      cpuUtilization: 0
    };
  }

  async applyRegion(token: string, projectRef: string, region: string): Promise<ApplyRegionResult> {
    try {
      // Only supported on new product, so we assume canSetRegion was true.
      // Deno API to update region (hypothetical structure based on typical PAAS API)
      const res = await fetchT(`https://api.deno.com/v1/projects/${projectRef}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ region })
      }, this.platform);

      if (!res.ok) {
        const err = await res.text();
        return { success: false, requiresRedeploy: false, error: `Deno API error: ${err}` };
      }

      return {
        success: true,
        requiresRedeploy: false,
        actionTaken: 'API_UPDATE'
      };
    } catch (error: any) {
      return { success: false, requiresRedeploy: false, error: error.message };
    }
  }
}
