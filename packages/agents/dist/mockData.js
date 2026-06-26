"use strict";
/**
 * CarboniX Mock Data Generator
 * Generates realistic cloud infrastructure metrics for the Collector Agent
 * when USE_MOCK_AGENTS=true (default for dev/hackathon)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockInstances = generateMockInstances;
// Realistic instance fleet that a mid-size Indian startup would run
const MOCK_FLEET = [
    // Production servers — high utilization
    {
        instanceId: 'i-0a1b2c3d4e5f6a7b8',
        instanceType: 't3.large',
        instanceName: 'api-server-prod-1',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 50,
        hoursRunning: 720,
    },
    {
        instanceId: 'i-0b2c3d4e5f6a7b8c9',
        instanceType: 't3.large',
        instanceName: 'api-server-prod-2',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 50,
        hoursRunning: 720,
    },
    // Database server — medium utilization
    {
        instanceId: 'i-0c3d4e5f6a7b8c9d0',
        instanceType: 'm5.xlarge',
        instanceName: 'postgres-primary',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 500,
        hoursRunning: 720,
    },
    // Worker server — varies
    {
        instanceId: 'i-0d4e5f6a7b8c9d0e1',
        instanceType: 't3.medium',
        instanceName: 'background-worker',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 30,
        hoursRunning: 720,
    },
    // ⚠️ IDLE: Dev/staging server that nobody turned off
    {
        instanceId: 'i-0e5f6a7b8c9d0e1f2',
        instanceType: 'm5.xlarge',
        instanceName: 'staging-server',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 100,
        hoursRunning: 720,
    },
    // ⚠️ IDLE: Old test server, forgotten
    {
        instanceId: 'i-0f6a7b8c9d0e1f2a3',
        instanceType: 't3.large',
        instanceName: 'legacy-test-env',
        provider: 'AWS',
        region: 'us-east-1',
        storageGb: 20,
        hoursRunning: 720,
    },
    // ⚠️ OVERSIZED: ML training server running tiny jobs
    {
        instanceId: 'i-0a7b8c9d0e1f2a3b4',
        instanceType: 'm5.xlarge',
        instanceName: 'ml-training-node',
        provider: 'AWS',
        region: 'us-east-1',
        storageGb: 200,
        hoursRunning: 720,
    },
    // GCP instance — EU region (clean energy)
    {
        instanceId: 'gce-carbonix-web-eu',
        instanceType: 't3.medium',
        instanceName: 'web-frontend-eu',
        provider: 'AWS',
        region: 'eu-north-1',
        storageGb: 20,
        hoursRunning: 720,
    },
    // Batch processing server
    {
        instanceId: 'i-0b8c9d0e1f2a3b4c5',
        instanceType: 't3.medium',
        instanceName: 'batch-processor',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 40,
        hoursRunning: 360,
    },
    // Redis cache server — light usage
    {
        instanceId: 'i-0c9d0e1f2a3b4c5d6',
        instanceType: 't3.medium',
        instanceName: 'redis-cache',
        provider: 'AWS',
        region: 'ap-south-1',
        storageGb: 10,
        hoursRunning: 720,
    },
];
/**
 * CPU utilization profiles — makes the demo realistic
 */
const UTILIZATION_PROFILES = {
    'api-server-prod-1': { cpuRange: [0.45, 0.75], memRange: [0.50, 0.70] },
    'api-server-prod-2': { cpuRange: [0.40, 0.70], memRange: [0.45, 0.65] },
    'postgres-primary': { cpuRange: [0.25, 0.45], memRange: [0.60, 0.80] },
    'background-worker': { cpuRange: [0.30, 0.55], memRange: [0.35, 0.50] },
    'staging-server': { cpuRange: [0.01, 0.04], memRange: [0.05, 0.10] }, // ← IDLE!
    'legacy-test-env': { cpuRange: [0.02, 0.03], memRange: [0.03, 0.08] }, // ← IDLE!
    'ml-training-node': { cpuRange: [0.08, 0.15], memRange: [0.10, 0.20] }, // ← OVERSIZED
    'web-frontend-eu': { cpuRange: [0.20, 0.40], memRange: [0.30, 0.45] },
    'batch-processor': { cpuRange: [0.50, 0.85], memRange: [0.40, 0.60] },
    'redis-cache': { cpuRange: [0.10, 0.18], memRange: [0.25, 0.40] }, // ← OVERSIZED
};
function randomBetween(min, max) {
    return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}
/**
 * Generate mock infrastructure data for a single collection run
 */
function generateMockInstances() {
    return MOCK_FLEET.map((instance) => {
        const profile = UTILIZATION_PROFILES[instance.instanceName] || {
            cpuRange: [0.20, 0.50],
            memRange: [0.30, 0.50],
        };
        return {
            ...instance,
            cpuUtilization: randomBetween(profile.cpuRange[0], profile.cpuRange[1]),
            memoryUtilization: randomBetween(profile.memRange[0], profile.memRange[1]),
            networkInGb: randomBetween(0.1, 5.0),
            networkOutGb: randomBetween(0.05, 3.0),
        };
    });
}
