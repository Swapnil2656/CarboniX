/**
 * CarboniX Collector Agent
 * 
 * Collects cloud infrastructure metrics and calculates carbon emissions.
 * In mock mode (USE_MOCK_AGENTS=true), generates realistic simulated data.
 * In live mode, would connect to AWS CloudWatch (requires AWS credentials).
 */

import { calculateCarbon } from '@carbonix/core';
import { DEFAULT_GRID_INTENSITIES } from '@carbonix/core';
import { generateMockInstances, MockInstance } from './mockData';

export interface EmissionRecordData {
  instanceId: string;
  instanceType: string;
  instanceName: string;
  provider: 'AWS' | 'GCP' | 'AZURE';
  region: string;
  cpuUtilization: number;
  memoryUtilization: number;
  networkInGb: number;
  networkOutGb: number;
  energyKwh: number;
  gridIntensity: number;
  carbonKg: number;
  isIdle: boolean;
  isOversized: boolean;
}

export interface CollectorResult {
  records: EmissionRecordData[];
  summary: string;
  totalCarbonKg: number;
  idleCount: number;
  oversizedCount: number;
  instanceCount: number;
}

/**
 * Run the Collector Agent
 * Pulls infrastructure metrics and calculates carbon for each instance
 */
export async function runCollector(useMock: boolean = true): Promise<CollectorResult> {
  const instances: MockInstance[] = useMock
    ? generateMockInstances()
    : []; // TODO: Live mode would call AWS CloudWatch here

  const records: EmissionRecordData[] = [];
  let totalCarbonKg = 0;
  let idleCount = 0;
  let oversizedCount = 0;

  for (const instance of instances) {
    try {
      // Use the core calculator for real carbon math
      const calcResult = await calculateCarbon({
        provider: instance.provider,
        region: instance.region,
        instanceType: instance.instanceType,
        instanceCount: 1,
        hoursPerMonth: instance.hoursRunning,
        cpuUtilization: instance.cpuUtilization,
        storageGb: instance.storageGb,
      });

      const isIdle = instance.cpuUtilization < 0.05;
      const isOversized = instance.cpuUtilization < 0.20 && !isIdle;

      if (isIdle) idleCount++;
      if (isOversized) oversizedCount++;

      const record: EmissionRecordData = {
        instanceId: instance.instanceId,
        instanceType: instance.instanceType,
        instanceName: instance.instanceName,
        provider: instance.provider,
        region: instance.region,
        cpuUtilization: instance.cpuUtilization,
        memoryUtilization: instance.memoryUtilization,
        networkInGb: instance.networkInGb,
        networkOutGb: instance.networkOutGb,
        energyKwh: calcResult.totalFinalEnergyKwh,
        gridIntensity: calcResult.gridIntensity,
        carbonKg: calcResult.co2KgMonth,
        isIdle,
        isOversized,
      };

      records.push(record);
      totalCarbonKg += calcResult.co2KgMonth;
    } catch (error) {
      // Skip instances that fail calculation (e.g., unknown instance type)
      console.warn(`[Collector] Skipping ${instance.instanceName}: ${(error as Error).message}`);
    }
  }

  const summary = `Collected ${records.length} instances across ${new Set(records.map(r => r.region)).size} regions. ` +
    `Found ${idleCount} idle, ${oversizedCount} oversized. ` +
    `Total: ${totalCarbonKg.toFixed(1)} kg CO₂/month`;

  return {
    records,
    summary,
    totalCarbonKg: Math.round(totalCarbonKg * 100) / 100,
    idleCount,
    oversizedCount,
    instanceCount: records.length,
  };
}
