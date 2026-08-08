import { runAnalyst } from './packages/agents/src/analyst';
import { EmissionRecordData } from './packages/agents/src/collector';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log('Testing Analyst...');
  const dummyRecords: EmissionRecordData[] = [
    {
      projectId: 'proj_123',
      instanceId: 'inst_1',
      instanceName: 'Test Vercel',
      instanceType: 'serverless',
      provider: 'VERCEL',
      region: 'ap-south-1',
      cpuUtilization: 0.8,
      memoryUtilization: 0.5,
      energyKwh: 10,
      gridIntensity: 750,
      carbonKg: 7.5,
      isIdle: false,
      isOversized: true
    }
  ];
  
  try {
    const result = await runAnalyst(dummyRecords, process.env.NVIDIA_API_KEY);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
