import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({ include: { deployments: true } });
  
  let updated = 0;
  for (const project of projects) {
    if (project.deployments.length === 0) continue;
    
    const records = await prisma.emissionRecord.findMany({ where: { projectId: project.id } });
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const deploymentIndex = i % project.deployments.length;
      const deploymentId = project.deployments[deploymentIndex].id;
      
      await prisma.emissionRecord.update({
        where: { id: record.id },
        data: { deploymentId }
      });
      updated++;
    }
  }
  console.log(`Assigned deploymentId to ${updated} emission records.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
