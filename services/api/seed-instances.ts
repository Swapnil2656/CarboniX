import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const instances = [
    { provider: 'AWS', name: 't3.micro', displayName: 'T3 Micro', family: 't3', category: 'GENERAL', vCPUs: 2, memoryGB: 1, cpuTdpWatts: 15, onDemandHourlyUsd: 0.0104, isPopular: true },
    { provider: 'AWS', name: 't3.small', displayName: 'T3 Small', family: 't3', category: 'GENERAL', vCPUs: 2, memoryGB: 2, cpuTdpWatts: 20, onDemandHourlyUsd: 0.0208, isPopular: true },
    { provider: 'AWS', name: 't3.medium', displayName: 'T3 Medium', family: 't3', category: 'GENERAL', vCPUs: 2, memoryGB: 4, cpuTdpWatts: 25, onDemandHourlyUsd: 0.0416, isPopular: true },
    { provider: 'AWS', name: 't3.large', displayName: 'T3 Large', family: 't3', category: 'GENERAL', vCPUs: 2, memoryGB: 8, cpuTdpWatts: 30, onDemandHourlyUsd: 0.0832, isPopular: true },
    { provider: 'GCP', name: 'e2-micro', displayName: 'E2 Micro', family: 'e2', category: 'GENERAL', vCPUs: 2, memoryGB: 1, cpuTdpWatts: 15, onDemandHourlyUsd: 0.0084, isPopular: true },
    { provider: 'GCP', name: 'e2-medium', displayName: 'E2 Medium', family: 'e2', category: 'GENERAL', vCPUs: 2, memoryGB: 4, cpuTdpWatts: 25, onDemandHourlyUsd: 0.0336, isPopular: true },
    { provider: 'AZURE', name: 'Standard_B1s', displayName: 'B1s', family: 'B-series', category: 'GENERAL', vCPUs: 1, memoryGB: 1, cpuTdpWatts: 15, onDemandHourlyUsd: 0.0104, isPopular: true },
  ];

  for (const instance of instances) {
    await prisma.instanceType.upsert({
      where: { provider_name: { provider: instance.provider as any, name: instance.name } },
      update: instance as any,
      create: instance as any,
    });
  }
  console.log('Seeded instances!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
