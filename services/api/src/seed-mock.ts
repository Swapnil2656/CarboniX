import { prisma } from './lib/prisma';

async function seed() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No user found! Please sign in to the web app first to create a user account.');
    process.exit(1);
  }

  console.log(`Found ${users.length} users. Seeding data for all...`);

  for (const user of users) {
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
        instanceId: 'i-mock' + i + '-' + user.id.substring(0,4),
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
    console.log(`Seeded project for user: ${user.email || user.id}`);
  }
  
  console.log('Successfully seeded mock projects.');
  console.log('Project Name: TEST_MOCK_PROJECT');
  console.log('You can delete this mock project from the dashboard Danger Zone when you are done.');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
