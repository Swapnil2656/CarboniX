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
        emailAlerts: profile?.emailAlerts ?? true,
        pushAlerts: profile?.pushAlerts ?? false,
        thresholdAlerts: profile?.thresholdAlerts ?? true
      }
    };
  } catch (error) {
    console.error("Failed to get profile:", error);
    return { success: false, error: "Failed to get profile" };
  }
}

export async function updateProfile(data: { name?: string; avatarUrl?: string; emailAlerts?: boolean; pushAlerts?: boolean; thresholdAlerts?: boolean }) {
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

    // Update the Profile table
    await prisma.profile.upsert({
      where: { userId },
      update: {
        ...(data.name && { fullName: data.name }),
        ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
        ...(data.emailAlerts !== undefined && { emailAlerts: data.emailAlerts }),
        ...(data.pushAlerts !== undefined && { pushAlerts: data.pushAlerts }),
        ...(data.thresholdAlerts !== undefined && { thresholdAlerts: data.thresholdAlerts }),
      },
      create: {
        userId,
        fullName: data.name || session.user.name || '',
        avatarUrl: data.avatarUrl || '',
        emailAlerts: data.emailAlerts ?? true,
        pushAlerts: data.pushAlerts ?? false,
        thresholdAlerts: data.thresholdAlerts ?? true
      },
    });

    // The userName field on the User model is a unique handle and should not be 
    // overwritten with the user's Full Name (which can contain spaces or duplicates).

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    if (error?.code === 'P2002') {
      return { success: false, error: "That username is already taken" };
    }
    return { success: false, error: "Failed to update profile" };
  }
}
