import { config } from 'dotenv';
import path from 'path';
config({ path: path.join(__dirname, '../../.env') });

import { runAnalyst, runOrchestrator, platformRegistry } from '@carbonix/agents';
import { prisma } from './src/lib/prisma';
import { decryptToken } from './src/lib/platformTokenService';

async function main() {
  console.log('Running End-to-End Orchestrator Test (Physical Infrastructure Migration)...');

  try {
    // 1. Get the first deployment that has a platform token (we know there's a Vercel one for Taskflow)
    const deployment = await prisma.deployment.findFirst({
      where: {
        platformTokenId: {
          not: null
        }
      },
      include: {
        platformToken: true,
        project: true
      }
    });

    if (!deployment) {
      throw new Error('No deployment with platform credentials found in database. Cannot test region switch.');
    }

    console.log(`Testing with Deployment: ${deployment.label || deployment.id} in Region: ${deployment.region}`);

    const mockInstanceId = deployment.label || deployment.id;

    // 2. Mock a high-carbon emission record for this deployment
    const mockRecords = [{
      id: 'mock-record-1',
      deploymentId: deployment.id,
      timestamp: new Date().toISOString(),
      cpuUsage: 99,
      memoryUsage: 99,
      networkTx: 10000,
      networkRx: 10000,
      carbonGrams: 95000, // Very high carbon -> MUST trigger migration
      instanceId: mockInstanceId,
      instanceType: 'vercel-edge',
      region: deployment.region || 'us-east-1',
      isIdle: true,
      isOversized: true
    }];

    // 3. Run Analyst
    console.log('\n--- Running Analyst ---');
    const analystResult = await runAnalyst(mockRecords as any, process.env.NVIDIA_API_KEY);
    console.log('Analyst generated recommendations:', analystResult.recommendations);
    
    if (analystResult.recommendations.length === 0) {
      console.log('No migration recommended. Test complete.');
      return;
    }

    // 4. Run Orchestrator
    console.log('\n--- Running Orchestrator ---');
    const applyRegionFn = async (instanceId: string, targetRegion: string) => {
      console.log(`=> applyRegionFn called for ${instanceId} -> ${targetRegion}`);
      try {
        const d = await prisma.deployment.findFirst({
          where: { OR: [{ label: instanceId }, { id: instanceId }] },
          include: { project: true, platformToken: true }
        });

        if (!d || !d.platformToken) {
          return { success: false, error: `No valid PlatformToken found for deployment: ${instanceId}` };
        }

        const token = decryptToken(d.platformToken.encryptedToken);
        const adapter = platformRegistry.getAdapter(d.platformToken.platform);
        
        if (!adapter) {
          return { success: false, error: `No adapter found for platform: ${d.platformToken.platform}` };
        }

        console.log(`=> Found ${d.platformToken.platform} adapter. Initiating physical API call...`);
        const result = await adapter.applyRegion(
          token, 
          d.platformToken.projectSlug || d.project.name, 
          targetRegion
        );

        if (result.success) {
          await prisma.deployment.update({
            where: { id: d.id },
            data: { region: targetRegion }
          });
        }

        return result;
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    };

    const orchestratorResult = await runOrchestrator(analystResult.recommendations, applyRegionFn, 1);
    console.log('\nOrchestrator Result:', JSON.stringify(orchestratorResult, null, 2));

  } catch (e: any) {
    console.error('ERROR:', e.message, e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
