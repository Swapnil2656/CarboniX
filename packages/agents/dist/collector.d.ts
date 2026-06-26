/**
 * CarboniX Collector Agent
 *
 * Collects cloud infrastructure metrics and calculates carbon emissions.
 * In mock mode (USE_MOCK_AGENTS=true), generates realistic simulated data.
 * In live mode, would connect to AWS CloudWatch (requires AWS credentials).
 */
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
export declare function runCollector(useMock?: boolean): Promise<CollectorResult>;
