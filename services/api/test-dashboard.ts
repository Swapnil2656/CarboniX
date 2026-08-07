import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);
  
  const weeklySparklineMap = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    weeklySparklineMap.set(d.toISOString().split('T')[0], 0);
  }
  
  const telemetryRecords = await prisma.emissionRecord.findMany({
    where: { timestamp: { gte: sevenDaysAgo } }
  });
  
  telemetryRecords.forEach(record => {
    const dateKey = record.timestamp.toISOString().split('T')[0];
    if (weeklySparklineMap.has(dateKey)) {
      weeklySparklineMap.set(dateKey, weeklySparklineMap.get(dateKey)! + record.carbonKg);
    }
  });
  console.log(Array.from(weeklySparklineMap.entries()));
}
main().then(() => process.exit(0));
