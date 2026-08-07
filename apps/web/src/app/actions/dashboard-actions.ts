'use server';

import { prisma } from '@/lib/carbonix-auth/prisma';
import { redis } from '@/lib/redis';
import { auth } from '@/auth';

export async function getProjects(page = 1, pageSize = 5) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const userId = session.user.id;
    // Cache is scoped per-user so users never see each other's projects
    const CACHE_KEY = `dashboard:projects_list:${userId}:${page}:${pageSize}`;

    // Try to get from cache, but don't fail if Redis is down
    try {
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (cacheErr) {
      console.warn('Redis cache get failed, falling back to DB:', cacheErr);
    }

    // Get total count for pagination
    const total = await prisma.project.count({ where: { userId } });
    const totalPages = Math.ceil(total / pageSize);

    // Only fetch projects belonging to the currently logged-in user for the specific page
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { deployments: true }
    });

    // Convert all Date fields to ISO strings so it's safe for Client Components
    const serializedProjects = projects.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      connectedAt: p.connectedAt?.toISOString() ?? null,
      lastPingAt: p.lastPingAt?.toISOString() ?? null,
      configInitializedAt: p.configInitializedAt?.toISOString() ?? null,
      deployments: p.deployments?.map(d => ({
        ...d,
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
      })) || [],
    }));

    const resultPayload = {
      success: true,
      projects: serializedProjects,
      total,
      totalPages,
      currentPage: page,
    };

    // Cache the result per user, but don't fail if Redis is down
    try {
      await redis.setex(CACHE_KEY, 5, JSON.stringify(resultPayload));
    } catch (cacheErr) {
      console.warn('Redis cache set failed:', cacheErr);
    }

    return resultPayload;
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    // Graceful fallback for Prisma Accelerate / Database connection issues
    if (error.message?.includes("Can't reach database server") || error.message?.includes("PrismaClientInitializationError")) {
      return { success: true, projects: [], total: 0, totalPages: 0, currentPage: 1 };
    }
    return { success: false, error: error.message };
  }
}


export async function getProjectApiKey(projectId: string): Promise<{ apiKey: string | null }> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { apiKey: null };

    // Verify the project belongs to the requesting user before returning the key
    const project = await prisma.project.findUnique({
      where: { id: projectId, userId: session.user.id },
      select: { userId: true },
    });
    if (!project) return { apiKey: null };

    const key = await prisma.apiKey.findFirst({
      where: { createdBy: project.userId, status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      select: { prefix: true },
    });

    // We only store hashed keys — return a masked prefix so the banner
    // can display the first characters the user already knows.
    return { apiKey: key ? `${key.prefix}...` : null };
  } catch (error: any) {
    console.error('Error fetching project API key:', error);
    return { apiKey: null };
  }
}


