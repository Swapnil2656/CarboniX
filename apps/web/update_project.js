const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.project.update({ where: { id: 'cmrj91e0e00013bnqtlwv0j87' }, data: { sdkConnected: true } }).then(console.log).catch(console.error).finally(() => prisma.$disconnect());
