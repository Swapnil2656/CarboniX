import { PrismaClient } from './node_modules/@prisma/client/index.js';

const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log('No user found! Please sign in to the web app first to create a user account.');
    process.exit(1);
  }

  const project = await prisma.project.create({
    data: {
      name: 'TEST_MOCK_PROJECT',
      region: 'us-east-1',
      provider: 'AWS',
      isDeployed: true,
      deploymentUrl: 'https://mock-project.vercel.app',
      sdkConnected: true,
      connectedAt: new Date(),
      lastPingAt: new Date(),
      userId: user.id
    }
  });

  const records = [];
  const now = Date.now();
  for (let i = 0; i < 24; i++) {
    records.push({
      projectId: project.id,
      timestamp: new Date(now - i * 3600 * 1000),
      instanceId: 'i-mock' + i,
      instanceType: 't3.medium',
      provider: 'AWS',
      region: 'us-east-1',
      cpuUtilization: Math.random() * 0.8 + 0.1,
      memoryUtilization: Math.random() * 0.6 + 0.2,
      networkInGb: Math.random(),
      networkOutGb: Math.random(),
      energyKwh: Math.random() * 2,
      carbonKg: Math.random() * 1.5,
      gridIntensity: 450,
      isIdle: Math.random() > 0.8,
      isOversized: Math.random() > 0.8,
      recommendation: 'Consider downscaling'
    });
  }

  await prisma.emissionRecord.createMany({ data: records });
  
  console.log('Successfully seeded 1 project and 24 emission records.');
  console.log('Project Name: TEST_MOCK_PROJECT');
  console.log('You can delete this mock project from the dashboard Danger Zone when you are done.');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
