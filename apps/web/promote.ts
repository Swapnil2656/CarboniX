import { PrismaClient } from './src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No users found in the database. Please sign up on the web app first.');
    return;
  }
  
  const user = users[0];
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { type: 'SUPER_ADMIN' },
  });
  
  console.log(`Successfully promoted user ${updatedUser.email} to SUPER_ADMIN!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
