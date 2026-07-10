/**
 * CarboniX SDK — Shared Type Definitions
 *
 * All request/response types used across the SDK methods.
 * These mirror the exact shapes accepted and returned by the CarboniX API.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'vercel' | 'netlify' | 'railway' | 'render' | 'other';

export type CarbonRating = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// ─── Calculate ────────────────────────────────────────────────────────────────

export interface CalculateInput {
  /** Cloud provider (e.g. 'aws', 'gcp', 'azure') */
  provider: CloudProvider;
  /** Region code (e.g. 'us-east-1', 'eu-north-1') */
  region: string;
  /** Instance/VM type (e.g. 'm5.xlarge', 't3.medium') */
  instanceType: string;
  /** Number of identical instances running */
  instanceCount: number;
  /** Hours per month the instance runs (max 730) */
  hoursPerMonth: number;
  /** CPU utilization as a decimal (e.g. 0.45 = 45%) */
  cpuUtilization: number;
  /** Total attached storage in GB */
  storageGb: number;
  /** Optional: Override the instance's default RAM in GB */
  ramGb?: number;
}

export interface CalculateResult {
  cpuEnergyKwh: number;
  memoryEnergyKwh: number;
  storageEnergyKwh: number;
  totalItEnergyKwh: number;
  pue: number;
  totalFinalEnergyKwh: number;
  /** Grid carbon intensity in gCO₂/kWh */
  gridIntensity: number;
  co2GramsMonth: number;
  co2KgMonth: number;
  co2GramsHour: number;
  computePercentage: number;
  memoryPercentage: number;
  storagePercentage: number;
  rating: {
    rating: CarbonRating;
    color: string;
    label: string;
    description: string;
  };
  equivalent: string;
  recommendation: {
    recommendedRegion?: string;
    recommendedCo2Kg?: number;
    reductionPercent?: number;
    recommendation?: string;
  };
}

// ─── Telemetry ────────────────────────────────────────────────────────────────

export interface TelemetryInput {
  /** Unique ID of the instance/server (e.g. 'i-0abc123') */
  instanceId: string;
  /** Instance or VM type (e.g. 'm5.xlarge') */
  instanceType: string;
  /** Cloud provider */
  provider: CloudProvider;
  /** Region where the instance is running */
  region: string;
  /** Current CPU utilization as a decimal (0.0 – 1.0) */
  cpuUtilization: number;
  /** Attached storage in GB */
  storageGb?: number;
  /** Human-readable project or service name */
  projectName?: string;
}

export interface TelemetryResult {
  id: string;
  instanceId: string;
  instanceType: string;
  provider: string;
  region: string;
  cpuUtilization: number;
  energyKwh: number;
  gridIntensity: number;
  carbonKg: number;
  isIdle: boolean;
  isOversized: boolean;
  timestamp: string;
}

// ─── Compare ──────────────────────────────────────────────────────────────────

export interface CompareResult {
  base: CalculateResult;
  options: CalculateResult[];
}

// ─── Recommend ────────────────────────────────────────────────────────────────

export interface RecommendResult {
  recommended?: {
    provider: string;
    region: string;
    co2KgMonth: number;
    savingsKg: number;
    reductionPercent: number;
    message: string;
  };
  message?: string;
}

// ─── SDK Config ───────────────────────────────────────────────────────────────

export interface CarbonixConfig {
  /** Your CarboniX API Key (starts with cx_) */
  apiKey: string;
  /** Override the API base URL (defaults to https://api.carbonix.dev) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 10_000) */
  timeoutMs?: number;
  /** SDK version string sent in user-agent */
  sdkVersion?: string;
}

// ─── Internal API Response Wrapper ───────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  calculationId?: string;
}
