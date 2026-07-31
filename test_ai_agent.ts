import * as fs from 'fs';
import { runCollector } from './packages/agents/src/collector';
import { runAnalyst } from './packages/agents/src/analyst';

async function main() {
  console.log('--- Starting Collector Agent (Mock Mode) ---');
  
  // 1. Run the Collector in Mock Mode
  // This bypasses real AWS/GCP and generates dummy instances.
  // It also runs calculateCarbon() on them.
  const collectorResult = await runCollector(true);
  
  console.log(`✅ Collected ${collectorResult.instanceCount} dummy instances.`);
  console.log(`✅ Calculated Total Carbon: ${collectorResult.totalCarbonKg.toFixed(2)} kg`);
  console.log(`⚠️ Idle: ${collectorResult.idleCount}, Oversized: ${collectorResult.oversizedCount}`);
  
  console.log('\n--- Starting Analyst Agent (AI / Nemotron) ---');
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    console.error('❌ ERROR: NVIDIA_API_KEY is missing in environment variables. Cannot test Nemotron.');
    process.exit(1);
  }
  
  // 2. Run the Analyst with the collected mock records
  // This will contact the mistralai/mistral-nemotron model on the Nvidia API
  const analystResult = await runAnalyst(collectorResult.records, apiKey);
  
  console.log('\n--- Analysis Complete ---');
  console.log(`✅ Nemotron provided ${analystResult.recommendations.length} recommendations.`);
  console.log(`✅ Total Projected Savings: ${analystResult.totalSavingsKg.toFixed(2)} kg CO₂`);
  
  // 3. Write output for reporting
  const output = {
    collectorResult,
    analystResult
  };
  
  fs.writeFileSync('test_output.json', JSON.stringify(output, null, 2));
  console.log('\n📄 Results written to test_output.json for report generation.');
}

main().catch((err) => {
  console.error('❌ Fatal error during test run:', err);
  process.exit(1);
});
