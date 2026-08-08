import { PrismaClient } from '@prisma/client';
import { decryptToken } from '../../services/api/src/lib/platformTokenService';
const prisma = new PrismaClient();

async function main() {
  const tokenRecord = await prisma.platformToken.findFirst({ where: { platform: 'VERCEL' } });
  if (!tokenRecord) { console.log('No Vercel token'); return; }
  
  const token = decryptToken(tokenRecord.encryptedToken);
  
  const res = await fetch('https://api.vercel.com/v9/projects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const data = await res.json();
  if (data.projects) {
    console.log(data.projects.map((p: any) => ({ name: p.name, id: p.id, region: p.serverlessFunctionRegion })));
  } else {
    console.log(data);
  }
}

main().then(() => process.exit(0)).catch(console.error);
