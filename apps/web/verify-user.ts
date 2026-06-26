import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No users found in the database.');
    return;
  }
  
  const user = users[users.length - 1];
  console.log(`Verifying and promoting user: ${user.email}`);
  
  await prisma.user.update({
    where: { id: user.id },
    data: { 
      isVerified: true,
      type: 'SUPER_ADMIN' 
    }
  });
  
  console.log('User has been successfully verified and promoted to SUPER_ADMIN!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
