const { PrismaClient } = require('./src/generated/prisma');
const db = new PrismaClient();
async function test() {
  try {
    const user = await db.user.findFirst();
    if (!user) return console.log('No user found');
    const userId = user.id;
    console.log('Testing for user', userId);

    await db.profile.upsert({
      where: { userId },
      update: {
        fullName: 'Test Name 123',
      },
      create: {
        userId,
        fullName: 'Test Name 123',
        avatarUrl: '',
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { userName: 'Test Name 123' },
    });
    console.log('Success');
  } catch(e) {
    console.error('ERROR:', e.message);
  }
}
test().catch(console.error).finally(() => db.$disconnect());
