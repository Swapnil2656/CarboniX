import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/carbonix-auth/prisma";
import { createHash, randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, region, skip } = await req.json();

    // If skip is true, just update isOnboarded
    if (skip) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { isOnboarded: true }
      });
      return NextResponse.json({ success: true, message: "Onboarding skipped" });
    }

    if (!name || !region) {
      return NextResponse.json({ error: "Name and region are required" }, { status: 400 });
    }

    // 1. Create the project
    const project = await prisma.project.create({
      data: {
        name,
        region,
        userId: session.user.id
      }
    });

    // 2. Automatically generate an API Key
    const rawKey = `cbx_${randomBytes(24).toString('hex')}`;
    const prefix = rawKey.substring(0, 12);
    const hashedKey = createHash('sha256').update(rawKey).digest('hex');

    await prisma.apiKey.create({
      data: {
        name: `${name} Default Key`,
        prefix,
        hashedKey,
        createdBy: session.user.id,
        permissions: ['calculate', 'compare', 'recommend', 'history'],
        status: 'ACTIVE'
      }
    });

    // 3. Mark user as onboarded
    await prisma.user.update({
      where: { id: session.user.id },
      data: { isOnboarded: true }
    });

    return NextResponse.json({ 
      success: true, 
      project,
      apiKey: rawKey // Only shown once!
    });

  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
