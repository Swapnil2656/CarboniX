"use strict";
/**
 * CarboniX Collector Agent
 *
 * Collects cloud infrastructure metrics and calculates carbon emissions.
 * In mock mode (USE_MOCK_AGENTS=true), generates realistic simulated data.
 * In live mode, would connect to AWS CloudWatch (requires AWS credentials).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCollector = runCollector;
const core_1 = require("@carbonix/core");
const mockData_1 = require("./mockData");
/**
 * Run the Collector Agent
 * Pulls infrastructure metrics and calculates carbon for each instance
 */
async function runCollector(useMock = true) {
    const instances = useMock
        ? (0, mockData_1.generateMockInstances)()
        : []; // TODO: Live mode would call AWS CloudWatch here
    const records = [];
    let totalCarbonKg = 0;
    let idleCount = 0;
    let oversizedCount = 0;
    for (const instance of instances) {
        try {
            // Use the core calculator for real carbon math
            const calcResult = await (0, core_1.calculateCarbon)({
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
            if (isIdle)
                idleCount++;
            if (isOversized)
                oversizedCount++;
            const record = {
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
        }
        catch (error) {
            // Skip instances that fail calculation (e.g., unknown instance type)
            console.warn(`[Collector] Skipping ${instance.instanceName}: ${error.message}`);
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
