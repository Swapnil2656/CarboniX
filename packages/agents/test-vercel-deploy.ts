import { PrismaClient } from '@prisma/client';
import { decryptToken } from '../../services/api/src/lib/platformTokenService';
const prisma = new PrismaClient();

async function main() {
  const tokenRecord = await prisma.platformToken.findFirst({ where: { platform: 'VERCEL' } });
  const token = decryptToken(tokenRecord!.encryptedToken);
  
  // Get taskflow project
  const projectId = 'prj_ycCOi0jmM1FcfPgijchroIv0X01U';
  
  // 1. Get latest deployment
  const depsRes = await fetch(`https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const deps = await depsRes.json();
  const latestId = deps.deployments[0].uid;
  console.log('Latest deployment:', latestId);
  
  // 2. Create new deployment from it
  const deployRes = await fetch(`https://api.vercel.com/v13/deployments`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'taskflow',
      deploymentId: latestId,
      meta: { action: 'carbonix-region-switch' }
    })
  });
  
  const deployData = await deployRes.json();
  console.log('Redeploy response:', JSON.stringify(deployData, null, 2));
}

main().then(() => process.exit(0)).catch(console.error);
