import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log('Projects:', projects.map(p => ({
    name: p.name,
    sdkConnected: p.sdkConnected
  })));
  
  const users = await prisma.user.findMany({ select: { id: true, email: true }});
  console.log('Users:', users);
}

main().finally(() => prisma.$disconnect());
