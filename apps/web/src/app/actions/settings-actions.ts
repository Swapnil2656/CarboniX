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
        avatarUrl: profile?.avatarUrl || ''
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
    const userId = session.user.id;

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

    // Also update User table name for consistency
    if (data.name) {
      await prisma.user.update({
        where: { id: userId },
        data: { userName: data.name },
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    if (error?.code === 'P2002') {
      return { success: false, error: "That username is already taken" };
    }
    return { success: false, error: "Failed to update profile" };
  }
}
