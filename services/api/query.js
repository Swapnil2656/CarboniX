const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const p = await prisma.project.findFirst({ where: { id: 'cmrj91e0e00013bnqtlwv0j87' }, include: { apiKeys: true } });
  console.log(JSON.stringify(p, null, 2));
}
main().finally(() => prisma.$disconnect());
