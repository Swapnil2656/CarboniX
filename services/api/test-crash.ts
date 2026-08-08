import { triggerCollector, triggerAnalyst } from './src/modules/agents/agents.controller';
import { prisma } from './src/lib/prisma';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function main() {
  const req = {
    query: { projectId: 'clzls0v3t000j63a1k84z0c9u' }, 
    body: { projectId: 'clzls0v3t000j63a1k84z0c9u' }
  };
  
  const res = {
    status: (code: number) => {
      console.log('Status:', code);
      return res;
    },
    json: (data: any) => {
      console.log('JSON Response:', JSON.stringify(data, null, 2));
      return res;
    }
  };

  try {
    console.log('Running Collector...');
    await triggerCollector(req as any, res as any);
    console.log('Collector finished. Running Analyst...');
    await triggerAnalyst(req as any, res as any);
    console.log('Analyst finished.');
  } catch (err) {
    console.error('Uncaught Exception:', err);
  }
}

main().finally(() => prisma.$disconnect());
