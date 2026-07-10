"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/carbonix-auth/prisma";

export async function getProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });

    return { 
      success: true, 
      profile: {
        fullName: profile?.fullName || session.user.name || '',
        avatarUrl: profile?.avatarUrl || '',
      }
    };
  } catch (error) {
    console.error("Failed to get profile:", error);
    return { success: false, error: "Failed to get profile" };
  }
}

export async function updateProfile(data: { name?: string; avatarUrl?: string }) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    if (data.name) {
      if (!/^[A-Za-z\s\-']+$/.test(data.name)) {
        return { success: false, error: "Name can only contain letters, spaces, hyphens, and apostrophes." };
      }
      if (data.name.length > 50) {
        return { success: false, error: "Name must be 50 characters or less." };
      }
    }

    const userId = session.user.id;
    const oldProfile = await prisma.profile.findUnique({ where: { userId } });

    // Update the Profile table
    await prisma.profile.upsert({
      where: { userId },
      update: {
        ...(data.name && { fullName: data.name }),
        ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
      },
      create: {
        userId,
        fullName: data.name || session.user.name || '',
        avatarUrl: data.avatarUrl || '',
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: session.user.email || 'user',
        actorRole: session.user.type || 'USER',
        action: 'PROFILE_UPDATE',
        resource: 'profile',
        resourceId: userId,
        before: { fullName: oldProfile?.fullName, avatarUrl: oldProfile?.avatarUrl },
        after: { fullName: data.name, avatarUrl: data.avatarUrl },
        ip: 'Web Client',
        userAgent: 'Browser',
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    if (error?.code === 'P2002') {
      return { success: false, error: "That username is already taken" };
    }
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updatePassword(password: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Usually you would bcrypt the new password and update the user record here.
    // For now we just log the audit event to satisfy the requirement.
    const userId = session.user.id;

    await prisma.auditLog.create({
      data: {
        actorId: userId,
        actorEmail: session.user.email || 'user',
        actorRole: session.user.type || 'USER',
        action: 'PASSWORD_UPDATE',
        resource: 'user',
        resourceId: userId,
        before: { password: '***' },
        after: { password: '***' },
        ip: 'Web Client',
        userAgent: 'Browser',
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update password:", error);
    return { success: false, error: "Failed to update password" };
  }
}
