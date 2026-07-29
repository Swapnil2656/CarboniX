import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("Users:", users.map(u => ({ id: u.id, email: u.email })));
  
  const projects = await prisma.project.findMany();
  console.log("Projects:", projects.map(p => ({ id: p.id, name: p.name, userId: p.userId })));
}

check().catch(console.error).finally(() => prisma.$disconnect());
