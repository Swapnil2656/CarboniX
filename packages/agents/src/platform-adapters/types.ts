export interface UsageMetrics {
  execDurationMs: number;
  cpuUtilization: number;
}

export interface VerifyTokenResult {
  valid: boolean;
  error?: string;
  meta?: Record<string, string>;
}

export interface ApplyRegionResult {
  success: boolean;
  requiresRedeploy: boolean;
  error?: string;
  // If PR fallback is used
  actionTaken?: 'API_UPDATE' | 'PR_OPENED' | 'FAILED';
  message?: string;
  details?: any;
}

export interface PlatformCapabilities {
  canFetchUsage: boolean;
  canSetRegion: boolean;
}

export interface PlatformAdapter {
  platform: string;
  capabilities: PlatformCapabilities;

  /**
   * Verifies if a token is valid for the given platform.
   * If a projectRef is provided, it can optionally verify scope.
   */
  verifyToken(token: string, projectRef?: string): Promise<VerifyTokenResult>;

  /**
   * Fetches usage metrics for the given project.
   */
  getUsage(token: string, projectRef?: string, period?: string): Promise<UsageMetrics>;

  /**
   * Applies a region switch.
   * - If supported via API, performs it.
   * - If unsupported via API (e.g. Render), returns requiresRedeploy: true.
   * - If only supported via repo config (e.g. Netlify toml), handles PR logic or delegates.
   */
  applyRegion(token: string, projectRef: string, region: string): Promise<ApplyRegionResult>;
}
