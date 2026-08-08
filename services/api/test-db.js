require('dotenv').config({ path: '../../.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latestRun = await prisma.agentRun.findFirst({
    where: { agentType: 'COLLECTOR', status: 'SUCCESS' },
    orderBy: { createdAt: 'desc' },
  });
  console.log('Latest Collector Run:', latestRun);
  
  if (latestRun) {
    const records = await prisma.emissionRecord.findMany({
      where: { agentRunId: latestRun.id }
    });
    console.log(`Records for this run: ${records.length}`);
    if (records.length > 0) {
      console.log('Sample record:', records[0].projectId);
    }
  }

  const allRecords = await prisma.emissionRecord.count();
  console.log('Total EmissionRecords in DB:', allRecords);
}

main().catch(console.error).finally(() => prisma.$disconnect());
