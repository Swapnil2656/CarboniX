// ─── Carbonix Admin TypeScript Interfaces ─────────────────────────────────────

// ─── Dashboard ──────────────────────────────────────────────────────────────
export interface ApiCallDataPoint {
  hour: string;
  calls: number;
}

export interface EndpointStat {
  path: string;
  calls: number;
}

export interface ProviderDistribution {
  provider: 'AWS' | 'GCP' | 'Azure';
  percent: number;
}

export interface LiveApiEvent {
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  status: number;
  latencyMs: number;
}

export interface DashboardData {
  totalApiCalls: number;
  activeSessions: number;
  avgCo2Kg: number;
  sdkInstalls: number;
  apiCallsOverTime: ApiCallDataPoint[];
  topEndpoints: EndpointStat[];
  providerDistribution: ProviderDistribution[];
  liveApiStream: LiveApiEvent[];
}

// ─── Users / Device Assets ──────────────────────────────────────────────────
export type TeamMemberStatus = 'ACTIVE' | 'BANNED';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  projectId: string;
  projectName: string;
  co2Emissions: number;
  location: string;
  status: TeamMemberStatus;
  aiSuggestion: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: TeamMember[];
  total: number;
  page: number;
  pageSize: number;
}

// ─── Feature Flags ──────────────────────────────────────────────────────────
export interface FeatureFlag {
  id: string;
  name: string;
  screen: string;
  enabled: boolean;
  lastChangedAt: string;
  lastChangedBy: string;
}

export interface FeatureFlagsResponse {
  flags: FeatureFlag[];
}

// ─── API Keys ───────────────────────────────────────────────────────────────
export type ApiKeyStatus = 'ACTIVE' | 'REVOKED';

export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  usageLast24h: number;
  status: ApiKeyStatus;
  createdAt: string;
}

export interface ApiKeysResponse {
  keys: ApiKey[];
  monthlyUsagePercent: number;
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface CreateApiKeyPayload {
  name: string;
  permissions: string[];
  expiration: string;
}

// ─── Emissions ──────────────────────────────────────────────────────────────
export interface EmissionRecord {
  id: string;
  instanceId: string;
  instanceType: string;
  provider: string;
  region: string;
  instanceName: string | null;
  cpuUtilization: number;
  memoryUtilization: number | null;
  networkInGb: number | null;
  networkOutGb: number | null;
  energyKwh: number;
  gridIntensity: number;
  carbonKg: number;
  isIdle: boolean;
  isOversized: boolean;
  recommendation: string | null;
  timestamp: string;
}

export interface EmissionsMetrics {
  totalInstances: number;
  idleInstances: number;
  oversizedInstances: number;
  wastedCarbonKg: number;
}

export interface EmissionsResponse {
  records: EmissionRecord[];
  metrics: EmissionsMetrics;
  isSdkConnected?: boolean;
}
