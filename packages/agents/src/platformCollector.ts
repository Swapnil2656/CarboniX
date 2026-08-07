import { calculateCarbon } from '@carbonix/core';
import type { EmissionRecordData } from './collector';
import { platformRegistry } from './platform-adapters/registry';
import { PlatformAuthError, PlatformTransientError, PlatformQuotaError } from './platform-adapters/errors';

export { PlatformAuthError, PlatformTransientError, PlatformQuotaError };

// ─── Grid intensity fallback map (gCO₂/kWh) ─────────────────────────────────
const REGION_GRID_INTENSITY: Record<string, number> = {
  'iad1':  415,
  'sfo1':  136,
  'lhr1':  231,
  'cdg1':  56,
  'arn1':  8,
  'sin1':  408,
  'bom1':  750,
  'hnd1':  506,
  'gru1':  74,
  'icn1':  415,
  'us-east-1':    415,
  'eu-west-1':    316,
  'ap-southeast-1': 408,
  'us-west1':     136,
  'europe-west1': 230,
  'asia-east1':   506,
};

function getGridIntensity(region?: string): number {
  if (!region) return 400;
  return REGION_GRID_INTENSITY[region] ?? 400;
}

// ─── Carbon calculation helper ────────────────────────────────────────────────

async function toEmissionRecord(
  instanceId: string,
  instanceName: string,
  instanceType: string,
  provider: 'AWS' | 'GCP' | 'AZURE',
  region: string,
  gridIntensity: number,
  execDurationMs: number,
  cpuUtilization: number,
): Promise<EmissionRecordData> {
  const hoursRunning = execDurationMs / (1000 * 60 * 60);

  const calcResult = await calculateCarbon({
    provider,
    region,
    instanceType,
    instanceCount: 1,
    hoursPerMonth: Math.max(hoursRunning, 0.001),
    cpuUtilization,
    storageGb: 0,
  });

  const isIdle = cpuUtilization < 0.05;
  const isOversized = cpuUtilization < 0.20 && !isIdle;

  return {
    instanceId,
    instanceType,
    instanceName,
    provider,
    region,
    cpuUtilization,
    memoryUtilization: 0.5,
    networkInGb: 0,
    networkOutGb: 0,
    energyKwh: calcResult.totalFinalEnergyKwh,
    gridIntensity: gridIntensity || calcResult.gridIntensity,
    carbonKg: calcResult.co2KgMonth,
    isIdle,
    isOversized,
  };
}

// ─── Public Entry Point ───────────────────────────────────────────────────────

export interface PlatformCollectorInput {
  platform: string; // VERCEL, NETLIFY, RENDER, RAILWAY, or any Tier 2 generic platform
  decryptedToken: string;
  projectSlug?: string;
}

/**
 * Collect real carbon emissions data from a PaaS platform.
 * Throws PlatformAuthError on 401/403, PlatformTransientError on transient failures.
 * Never returns mock data.
 */
export async function collectFromPlatform(
  input: PlatformCollectorInput
): Promise<EmissionRecordData[]> {
  const { platform, decryptedToken, projectSlug } = input;
  
  const adapter = platformRegistry.getAdapter(platform);
  if (!adapter) {
    throw new Error(`[PlatformCollector] Unknown or unsupported platform: ${platform}`);
  }

  if (!adapter.capabilities.canFetchUsage) {
    throw new Error(`[PlatformCollector] Platform ${platform} does not support fetching usage metrics.`);
  }

  // Get metrics from the adapter
  const metrics = await adapter.getUsage(decryptedToken, projectSlug, '30d');
  
  // We'll use some default fallback region mappings if not exposed directly by the adapter payload
  // In a full implementation, the adapter might return the exact region.
  const region = platform === 'VERCEL' ? 'iad1' : 'us-east-1';
  
  const record = await toEmissionRecord(
    `${platform.toLowerCase()}-${projectSlug || 'unknown'}`,
    `${platform}: ${projectSlug || 'Unknown Project'}`,
    't3.medium', // standard base equivalence for function/container
    'AWS',
    region,
    getGridIntensity(region),
    Math.max(metrics.execDurationMs, 60_000), // min 1 minute
    metrics.cpuUtilization
  );

  return [record];
}
