import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/carbonix-auth/prisma';
import { createHash, randomBytes } from 'crypto';

// POST /api/projects/[id]/reveal-key
// Creates a brand-new API key for this project and returns it ONCE.
// The old key is revoked. This mirrors how Vercel/Railway handle "show key" flows.
export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the project belongs to this user
    const project = await prisma.project.findUnique({
      where: { id: params.id, userId: session.user.id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Revoke only existing ACTIVE keys for THIS specific project (matched by name)
    await prisma.apiKey.updateMany({
      where: { 
        createdBy: session.user.id, 
        name: `${project.name} Key`,
        status: 'ACTIVE' 
      },
      data: { status: 'REVOKED', revokedAt: new Date(), revokedBy: session.user.id },
    });

    // Generate a fresh key
    const rawKey = `cbx_${randomBytes(24).toString('hex')}`;
    const prefix = rawKey.substring(0, 12);
    const hashedKey = createHash('sha256').update(rawKey).digest('hex');

    await prisma.apiKey.create({
      data: {
        name: `${project.name} Key`,
        prefix,
        hashedKey,
        createdBy: session.user.id,
        permissions: ['calculate', 'compare', 'recommend', 'history'],
        status: 'ACTIVE',
      },
    });

    // Return the raw key — this is the ONLY time it will ever be shown
    return NextResponse.json({ success: true, apiKey: rawKey });
  } catch (error: any) {
    console.error('Reveal key error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
