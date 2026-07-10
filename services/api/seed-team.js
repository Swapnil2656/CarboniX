const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.teamMember.deleteMany({});
  
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Swapnil Sen',
        email: 'swapnil@carbonix.io',
        role: 'Team Lead',
        projectId: 'proj_alpha',
        projectName: 'CarboniX Core',
        co2Emissions: 180.5,
        location: 'US East (N. Virginia)',
        aiSuggestion: 'AI suggests shifting your scheduled batch jobs to off-peak hours (2AM-5AM PST) to reduce grid intensity by 15%.',
      },
      {
        name: 'Jane Doe',
        email: 'jane@carbonix.io',
        role: 'Backend Engineer',
        projectId: 'proj_alpha',
        projectName: 'CarboniX Core',
        co2Emissions: 245.2,
        location: 'EU West (Ireland)',
        aiSuggestion: 'Your active Lambda functions are frequently invoked in EU West during peak hours. Consider caching aggressive queries.',
      },
      {
        name: 'Alex Smith',
        email: 'alex@carbonix.io',
        role: 'DevOps',
        projectId: 'proj_beta',
        projectName: 'Mobile Analytics',
        co2Emissions: 85.0,
        location: 'AP South (Mumbai)',
        aiSuggestion: 'Great job! Your recent shift to graviton instances has reduced carbon output by 40%.',
      }
    ]
  });
  console.log('Seed completed.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
