
import { prisma } from './src/lib/prisma';
async function run() {
  const emissionWhere = {};
  await prisma.session.count({ where: { isActive: true } });
  await prisma.emissionRecord.aggregate({
    where: emissionWhere,
    _avg: { gridIntensity: true },
  });
  await prisma.mobileUser.count();
  await prisma.emissionRecord.groupBy({
    by: ['provider'],
    where: emissionWhere,
    _count: true,
  });
  await prisma.calculation.findMany({
    where: { 
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      userId: { in: [] }
    },
    select: { createdAt: true }
  });
}
run().then(() => console.log('success')).catch(e => console.error(e)).finally(() => prisma.$disconnect());

