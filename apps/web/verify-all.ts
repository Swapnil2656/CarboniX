import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No users found in the database.');
    return;
  }
  
  console.log(`Found ${users.length} users. Verifying and promoting all of them...`);
  
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        isVerified: true,
        type: 'SUPER_ADMIN' 
      }
    });
    console.log(`- Verified and promoted: ${user.email}`);
  }
  
  console.log('All users have been successfully verified and promoted to SUPER_ADMIN!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
