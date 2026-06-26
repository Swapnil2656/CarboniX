/**
 * CarboniX Mock Data Generator
 * Generates realistic cloud infrastructure metrics for the Collector Agent
 * when USE_MOCK_AGENTS=true (default for dev/hackathon)
 */
export interface MockInstance {
    instanceId: string;
    instanceType: string;
    instanceName: string;
    provider: 'AWS' | 'GCP' | 'AZURE';
    region: string;
    cpuUtilization: number;
    memoryUtilization: number;
    networkInGb: number;
    networkOutGb: number;
    storageGb: number;
    hoursRunning: number;
}
/**
 * Generate mock infrastructure data for a single collection run
 */
export declare function generateMockInstances(): MockInstance[];
