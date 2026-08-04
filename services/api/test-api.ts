import { PrismaClient } from '@prisma/client';
import { getProjectStats } from './src/modules/admin/admin.controller';

async function test() {
  const prisma = new PrismaClient();
  const project = await prisma.project.findFirst({ where: { id: 'cmrfc3vj60003dg0wp35upsrn' }});
  
  if (!project) { console.log("No project"); return; }
  const user = await prisma.user.findUnique({ where: { id: project.userId }});
  
  const req = {
    params: { id: project.id },
    user: { id: user?.id, email: user?.email, role: user?.type },
    query: {}
  } as any;
  
  const res = {
    status: (code: number) => ({
      json: (data: any) => { console.log("STATUS", code, data); }
    }),
    json: (data: any) => { console.log("SUCCESS"); }
  } as any;

  try {
    await getProjectStats(req, res);
  } catch (e: any) {
    console.error("UNCAUGHT ERROR:", e);
  }
}
test();
