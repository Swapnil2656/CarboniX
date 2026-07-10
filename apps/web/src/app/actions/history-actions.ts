'use server';

import { prisma } from '@/lib/carbonix-auth/prisma';
import { auth } from '@/auth';

export async function getHistoryLogs(page = 1, pageSize = 15, search = '') {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }



    const isAdmin = session.user.type === 'SUPER_ADMIN' || session.user.type === 'ADMIN';

    const where: any = search
      ? {
          OR: [
            { actorEmail: { contains: search, mode: 'insensitive' as const } },
            { action: { contains: search, mode: 'insensitive' as const } },
            { resource: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // Regular users should only see their own logs
    if (!isAdmin) {
      where.actorId = session.user.id;
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      success: true,
      logs,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error: any) {
    console.error('Failed to fetch history logs:', error);
    return { success: false, error: error.message };
  }
}
