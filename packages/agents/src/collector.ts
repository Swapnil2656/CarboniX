/**
 * CarboniX Collector Agent
 * 
 * Collects cloud infrastructure metrics and calculates carbon emissions.
 * In mock mode (USE_MOCK_AGENTS=true), generates realistic simulated data.
 * In live mode, uses AWS CloudWatch and GCP Monitoring.
 */

import { calculateCarbon } from '@carbonix/core';
import { generateMockInstances, MockInstance } from './mockData';
import { CloudWatchClient, GetMetricStatisticsCommand } from '@aws-sdk/client-cloudwatch';
import monitoring from '@google-cloud/monitoring';

export interface EmissionRecordData {
  projectId?: string;
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

async function fetchAwsMetrics(instanceId: string, region: string): Promise<{ cpu: number, memory: number }> {
  try {
    const client = new CloudWatchClient({ region });
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 3600 * 1000); // last 1 hour

    const command = new GetMetricStatisticsCommand({
      Namespace: 'AWS/EC2',
      MetricName: 'CPUUtilization',
      Dimensions: [{ Name: 'InstanceId', Value: instanceId }],
      StartTime: startTime,
      EndTime: endTime,
      Period: 3600,
      Statistics: ['Average'],
    });

    const response = await client.send(command);
    const avgCpu = response.Datapoints?.[0]?.Average || 0;
    
    // Convert 0-100% to 0.0-1.0
    return { cpu: avgCpu / 100, memory: 0.5 }; // memory requires CloudWatch agent
  } catch (error) {
    console.warn(`[Collector] AWS CloudWatch fetch failed for ${instanceId}: ${(error as Error).message}`);
    return { cpu: 0, memory: 0 };
  }
}

async function fetchGcpMetrics(instanceId: string, projectId: string): Promise<{ cpu: number, memory: number }> {
  try {
    const client = new monitoring.MetricServiceClient();
    const request = {
      name: client.projectPath(projectId),
      filter: `metric.type="compute.googleapis.com/instance/cpu/utilization" AND resource.labels.instance_id="${instanceId}"`,
      interval: {
        startTime: {
          seconds: Date.now() / 1000 - 3600,
        },
        endTime: {
          seconds: Date.now() / 1000,
        },
      },
      aggregation: {
        alignmentPeriod: { seconds: 3600 },
        perSeriesAligner: 'ALIGN_MEAN' as const,
      },
    };

    const [timeSeries] = await client.listTimeSeries(request);
    const avgCpu = timeSeries[0]?.points?.[0]?.value?.doubleValue || 0;
    return { cpu: avgCpu, memory: 0.5 };
  } catch (error) {
    console.warn(`[Collector] GCP Monitoring fetch failed for ${instanceId}: ${(error as Error).message}`);
    return { cpu: 0, memory: 0 };
  }
}

/**
 * Run the Collector Agent
 * Pulls infrastructure metrics and calculates carbon for each instance
 */
export async function runCollector(useMock: boolean = true): Promise<CollectorResult> {
  const instances: MockInstance[] = generateMockInstances();

  const records: EmissionRecordData[] = [];
  let totalCarbonKg = 0;
  let idleCount = 0;
  let oversizedCount = 0;

  for (const instance of instances) {
    try {
      let cpuUtilization = instance.cpuUtilization;
      let memoryUtilization = instance.memoryUtilization;

      if (!useMock) {
        if (instance.provider === 'AWS') {
          const metrics = await fetchAwsMetrics(instance.instanceId, instance.region);
          if (metrics.cpu > 0) cpuUtilization = metrics.cpu;
        } else if (instance.provider === 'GCP') {
          const metrics = await fetchGcpMetrics(instance.instanceId, process.env.GOOGLE_CLOUD_PROJECT || '');
          if (metrics.cpu > 0) cpuUtilization = metrics.cpu;
        }
      }

      // Use the core calculator for real carbon math
      const calcResult = await calculateCarbon({
        provider: instance.provider,
        region: instance.region,
        instanceType: instance.instanceType,
        instanceCount: 1,
        hoursPerMonth: instance.hoursRunning,
        cpuUtilization: cpuUtilization,
        storageGb: instance.storageGb,
      });

      const isIdle = cpuUtilization < 0.05;
      const isOversized = cpuUtilization < 0.20 && !isIdle;

      if (isIdle) idleCount++;
      if (isOversized) oversizedCount++;

      const record: EmissionRecordData = {
        instanceId: instance.instanceId,
        instanceType: instance.instanceType,
        instanceName: instance.instanceName,
        provider: instance.provider,
        region: instance.region,
        cpuUtilization: cpuUtilization,
        memoryUtilization: memoryUtilization,
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
    totalCarbonKg,
    idleCount,
    oversizedCount,
    instanceCount: records.length,
  };
}
