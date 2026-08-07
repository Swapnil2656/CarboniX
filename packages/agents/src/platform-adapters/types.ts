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
  errorCategory?: 'AUTH' | 'QUOTA' | 'TRANSIENT' | 'UNSUPPORTED' | 'OTHER';
  fallbackRequired?: boolean;
  // If PR fallback is used
  actionTaken?: 'API_UPDATE' | 'PR_OPENED' | 'NOT_SUPPORTED' | 'FAILED';
  message?: string;
  details?: any;
  manualInstructions?: string[];
}

export interface PlatformCapabilities {
  canFetchUsage: boolean;
  canSetRegion: boolean;
}

export interface PlatformMetadata {
  displayName: string;
  icon: string;
  docsUrl: string;
  category: 'FRONTEND' | 'BACKEND' | 'SELF_HOSTED';
  regionSwitchSupport: 'AUTO' | 'MANUAL_PR' | 'NOT_SUPPORTED';
}

export interface PlatformAdapter {
  platform: string;
  metadata: PlatformMetadata;
  capabilities: PlatformCapabilities;

  /**
   * Optionally fetches dynamic capabilities based on the account/plan state.
   */
  checkDynamicCapabilities?(token: string, projectRef?: string): Promise<PlatformCapabilities>;

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
