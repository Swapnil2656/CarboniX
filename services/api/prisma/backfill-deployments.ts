/**
 * One-time backfill: create one Deployment per existing Project.
 *
 * Rules (per user decision):
 *  - role = OTHER (not FULLSTACK — backfill can't verify architectural intent)
 *  - label = null (user can set it via deployment card when they add a second one)
 *  - region/provider/isDeployed/deploymentUrl copied from Project scalars
 *  - First active PlatformToken for the project → platformTokenId on the Deployment
 *  - All existing EmissionRecord rows for the project → deploymentId = new Deployment.id
 *
 * Run with:
 *   DATABASE_URL="..." npx ts-node --project tsconfig.json prisma/backfill-deployments.ts
 */

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    include: {
      platformTokens: { where: { status: 'ACTIVE' }, orderBy: { createdAt: 'asc' } },
      deployments: { select: { id: true } },
    },
  });

  let created = 0;
  let skipped = 0;

  for (const project of projects) {
    if (project.deployments.length > 0) {
      console.log(`[BACKFILL] Skipping "${project.name}" — already has ${project.deployments.length} deployment(s).`);
      skipped++;
      continue;
    }

    const firstToken = project.platformTokens[0] ?? null;

    const deployment = await prisma.deployment.create({
      data: {
        projectId: project.id,
        role: 'OTHER',
        label: null,
        region: project.region ?? null,
        provider: project.provider ?? null,
        isDeployed: project.isDeployed,
        deploymentUrl: project.deploymentUrl ?? null,
        platformTokenId: firstToken?.id ?? null,
      },
    });

    const { count } = await prisma.emissionRecord.updateMany({
      where: { projectId: project.id, deploymentId: null },
      data: { deploymentId: deployment.id },
    });

    console.log(
      `[BACKFILL] "${project.name}" → Deployment ${deployment.id} ` +
      `(token: ${firstToken?.platform ?? 'none'}, records stamped: ${count})`
    );
    created++;
  }

  console.log(`\n[BACKFILL] Done. Created: ${created}, Skipped (already migrated): ${skipped}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
