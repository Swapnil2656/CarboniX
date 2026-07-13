"use server";
import { signIn } from "@/auth";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { db } from "./prisma-db";
import { prisma } from "./prisma";
import { createUserSchema, signInSchema } from "./zod";
import crypto from "crypto";
import { sendEmail } from "./email";
import { userType } from "@/generated/prisma";
import { authConfig } from "@/carbonix-auth.config";

export async function signInUser(data: { email: string; password: string }) {
  const validation = signInSchema.safeParse(data);
  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || "Invalid credentials" };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Something went wrong" };
  }
}

export async function signUp(data: {
  userName: string;
  email: string;
  password: string;
  type?: userType;
}) {
  const validation = createUserSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Invalid user data");
  }

  const { userName, email, password } = validation.data;
  const accountType = data.type ?? userType.USER;

  const existingUsername = await db.user.findUnique({ userName });
  if (existingUsername) throw new Error("Username already taken");

  const existingUser = await db.user.findUnique({ email });
  if (existingUser) throw new Error("An account with that email already exists");

  const existingTeamMembers = await prisma.$queryRaw<any[]>`SELECT id FROM "TeamMember" WHERE email = ${email} LIMIT 1`;
  const isInvited = existingTeamMembers && existingTeamMembers.length > 0;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({ 
    userName, 
    email, 
    password: hashedPassword, 
    type: accountType,
    isOnboarded: isInvited
  });
  await db.profile.create({ userId: user.id, fullName: userName });

  const token = crypto.randomBytes(32).toString("hex");
  await db.verificationToken.create({
    token,
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    userId: user.id,
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}${authConfig.routes.verify}?token=${token}`;

  try {
    await sendEmail(
      user.email,
      `Verify your ${authConfig.app.name} account`,
      `<div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2>Hi ${user.userName},</h2>
        <p>Welcome to <strong>${authConfig.app.name}</strong>! Please verify your email to activate your account:</p>
        <p>
          <a href="${verifyUrl}" style="
            display:inline-block;padding:12px 24px;background:${process.env.BRAND_COLOR ?? '#4f46e5'};
            color:white;text-decoration:none;border-radius:8px;font-weight:600
          ">Verify Email</a>
        </p>
        <p style="color:#6b7280;font-size:13px">Link expires in 1 hour. If you didn't sign up, ignore this email.</p>
      </div>`
    );
  } catch (error) {
    console.error("⚠️ Failed to send verification email (Missing MAIL_USER / MAIL_PASS in .env?):", error);
    console.log(`\n\n🔗 [DEV] VERIFICATION LINK: ${verifyUrl}\n\n`);
  }
}

export async function verifyEmail(token: string) {
  const tokenRecord = await db.verificationToken.findUnique({ token });
  if (!tokenRecord) throw new Error("Invalid or expired verification link");

  if (tokenRecord.expires < new Date()) {
    await db.verificationToken.delete({ id: tokenRecord.id });
    throw new Error("Verification link expired. Please sign up again.");
  }

  try {
    await db.user.update({ id: tokenRecord.userId }, { isVerified: true });
  } finally {
    await db.verificationToken.delete({ id: tokenRecord.id });
  }
}
