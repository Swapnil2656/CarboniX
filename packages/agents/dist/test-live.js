"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collector_1 = require("./collector");
async function main() {
    console.log('--- Testing Collector with MOCK (useMock = true) ---');
    const mockResult = await (0, collector_1.runCollector)(true);
    console.log(`Summary: ${mockResult.summary}`);
    console.log(`Total Carbon: ${mockResult.totalCarbonKg} kg`);
    console.log(`First Instance CPU: ${mockResult.records[0].cpuUtilization * 100}%`);
    console.log('\n--- Testing Collector with LIVE APIs (useMock = false) ---');
    console.log('Note: Without actual AWS/GCP credentials, this will show SDK warnings and default CPU to 0%');
    const liveResult = await (0, collector_1.runCollector)(false);
    console.log(`Summary: ${liveResult.summary}`);
    console.log(`Total Carbon: ${liveResult.totalCarbonKg} kg`);
    console.log(`First Instance CPU: ${liveResult.records[0].cpuUtilization * 100}%`);
}
main().catch(console.error);
