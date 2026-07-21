import { getDashboard, getProjectStats, getEmissions } from './modules/admin/admin.controller';
import { prisma } from './lib/prisma';
import { Request, Response } from 'express';

async function run() {
  const project = await prisma.project.findFirst({ include: { user: true } });
  if (!project) {
    console.log('No project found in DB');
    return;
  }
  
  const req = {
    user: { id: project.user.id, email: project.user.email },
    params: { id: project.id },
    query: {}
  } as unknown as Request;
  
  const res = {
    json: (data: any) => console.log('JSON Output:', JSON.stringify(data).substring(0, 200)),
    status: (code: number) => {
      console.log('Status code:', code);
      return res;
    }
  } as unknown as Response;

  console.log('--- Testing getProjectStats ---');
  await getProjectStats(req, res);
  
  console.log('--- Testing getDashboard ---');
  await getDashboard(req, res);
  
  console.log('--- Testing getEmissions ---');
  await getEmissions(req, res);
}

run().then(() => process.exit(0)).catch(e => { console.error('CRASH', e); process.exit(1); });
