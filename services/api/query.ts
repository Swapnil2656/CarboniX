import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const emissionTypes = await prisma.emissionRecord.groupBy({ by: ['instanceType'], _count: { instanceType: true } });
  console.log('Emission Types:', emissionTypes);
  
  const instanceTypes = await prisma.instanceType.findMany({ select: { name: true, onDemandHourlyUsd: true } });
  console.log('Instance Types:', instanceTypes);
  
  const deployIds = await prisma.deployment.findMany({ select: { id: true, role: true } });
  console.log('Deployments:', deployIds);
  
  const audits = await prisma.auditLog.findMany({ where: { action: 'EMISSION_MIGRATE' }, select: { before: true, after: true }});
  console.log('Audits:', audits);
}
main().then(() => prisma.$disconnect());
