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

    const { name, skip } = await req.json();

    // If skip is true, just update isOnboarded
    if (skip) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { isOnboarded: true }
      });
      return NextResponse.json({ success: true, message: "Onboarding skipped" });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    // 1. Create the project (region is optional — AI will determine optimal region)
    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        userId: session.user.id
      }
    });

    // 2. Automatically generate an API Key
    const rawKey = `cbx_${randomBytes(24).toString('hex')}`;
    const prefix = rawKey.substring(0, 12);
    const hashedKey = createHash('sha256').update(rawKey).digest('hex');

    await prisma.apiKey.create({
      data: {
        name: `${name.trim()} Default Key`,
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

    // Serialize all Date fields to ISO strings for client components
    return NextResponse.json({
      success: true,
      project: {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        connectedAt: project.connectedAt?.toISOString() ?? null,
        lastPingAt: project.lastPingAt?.toISOString() ?? null,
      },
      apiKey: rawKey // Only shown once!
    });

  } catch (error: any) {
    // Log full error detail so we can debug
    console.error("Onboarding error:", error?.message, error?.code, error?.meta);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

