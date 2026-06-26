'use server';

import { prisma } from '@/lib/carbonix-auth/prisma';
import { redis } from '@/lib/redis';

export async function getProjects() {
  try {
    const CACHE_KEY = 'dashboard:projects_list';
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      return { success: true, projects: JSON.parse(cached) };
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    // Convert Dates to ISO strings so it's safe for Client Components
    const serializedProjects = projects.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
    }));

    // Cache the result for 5 seconds to reduce DB load from polling
    await redis.setex(CACHE_KEY, 5, JSON.stringify(serializedProjects));

    return {
      success: true,
      projects: serializedProjects,
    };
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return { success: false, error: error.message };
  }
}
