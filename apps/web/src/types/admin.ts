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
export type DeviceStatus = 'ACTIVE' | 'BANNED';

export interface DeviceAsset {
  id: string;
  deviceId: string;
  email: string;
  country: string;
  countryCode: string;
  cloud: 'AWS' | 'GCP' | 'Azure';
  region: string;
  avgCo2KgPerHour: number;
  calculationsOps: string;
  lastActive: string;
  status: DeviceStatus;
}

export interface UsersResponse {
  users: DeviceAsset[];
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
}

export interface CreateApiKeyPayload {
  name: string;
  permissions: string[];
  expiration: string;
}
