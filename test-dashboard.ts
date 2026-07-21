import { PrismaClient } from './services/api/node_modules/@prisma/client/index.js';
const prisma = new PrismaClient();

async function run() {
  const emissionWhere = {};
  
  console.log('1. activeSessions');
  await prisma.session.count({ where: { isActive: true } });
  
  console.log('2. avg gridIntensity');
  await prisma.emissionRecord.aggregate({
    where: emissionWhere,
    _avg: { gridIntensity: true },
  });
  
  console.log('3. sdkInstalls');
  await prisma.mobileUser.count();
  
  console.log('4. providerGroups');
  await prisma.emissionRecord.groupBy({
    by: ['provider'],
    where: emissionWhere,
    _count: true,
  });

  console.log('5. calculations');
  await prisma.calculation.findMany({
    where: { 
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      userId: { in: [] }
    },
    select: { createdAt: true }
  });
}
run().then(() => console.log('success')).catch(e => console.error(e)).finally(() => prisma.$disconnect());
