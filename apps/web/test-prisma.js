const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to DB...");
  try {
    const start = Date.now();
    const projects = await prisma.project.findMany();
    console.log(`Fetched ${projects.length} projects in ${Date.now() - start}ms`);
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
