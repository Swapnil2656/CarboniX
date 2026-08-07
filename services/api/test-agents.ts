import { config } from 'dotenv';
import path from 'path';
config({ path: path.join(__dirname, '../../.env') });

import { runCollector, runAnalyst } from '@carbonix/agents';

async function main() {
  console.log('Running collector...');
  try {
    const collectorResult = await runCollector(true); // USE_MOCK=true
    console.log('Collector SUCCESS:', collectorResult);
    
    console.log('Running analyst...');
    const analystResult = await runAnalyst(collectorResult.records, process.env.NVIDIA_API_KEY);
    console.log('Analyst SUCCESS:', analystResult);
  } catch (e: any) {
    console.error('ERROR:', e.message, e);
  }
}

main();
