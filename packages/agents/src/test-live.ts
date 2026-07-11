import { runCollector } from './collector';

async function main() {
  console.log('--- Testing Collector with MOCK (useMock = true) ---');
  const mockResult = await runCollector(true);
  console.log(`Summary: ${mockResult.summary}`);
  console.log(`Total Carbon: ${mockResult.totalCarbonKg} kg`);
  console.log(`First Instance CPU: ${mockResult.records[0].cpuUtilization * 100}%`);

  console.log('\n--- Testing Collector with LIVE APIs (useMock = false) ---');
  console.log('Note: Without actual AWS/GCP credentials, this will show SDK warnings and default CPU to 0%');
  const liveResult = await runCollector(false);
  console.log(`Summary: ${liveResult.summary}`);
  console.log(`Total Carbon: ${liveResult.totalCarbonKg} kg`);
  console.log(`First Instance CPU: ${liveResult.records[0].cpuUtilization * 100}%`);
}

main().catch(console.error);
