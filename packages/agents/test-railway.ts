import { PrismaClient } from '@prisma/client';
import { decryptToken } from '../../services/api/src/lib/platformTokenService';
const prisma = new PrismaClient();

async function main() {
  const tokenRecord = await prisma.platformToken.findFirst({ where: { platform: 'RAILWAY' } });
  const token = decryptToken(tokenRecord!.encryptedToken);
  
  const query = `
    query {
      __type(name: "ProjectUpdateInput") {
        inputFields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  `;
  
  const res = await fetch('https://backboard.railway.app/graphql/v2', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

main().then(() => process.exit(0)).catch(console.error);
