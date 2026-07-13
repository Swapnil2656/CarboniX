import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/carbonix-auth/prisma-db";
import { prisma } from "./lib/carbonix-auth/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema } from "./lib/carbonix-auth/zod";
import { authConfig } from "./carbonix-auth.config";

declare module "next-auth" {
  interface User {
    type?: string;
    isOnboarded?: boolean;
    avatarUrl?: string;
  }
  interface Session {
    user: {
      id: string;
      type?: string;
      isOnboarded?: boolean;
      avatarUrl?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    type?: string;
    isOnboarded?: boolean;
    accessToken?: string;
    avatarUrl?: string;
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" },
      },
      authorize: async credentials => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await prisma.user.findUnique({ 
          where: { email },
          include: { profile: true }
        });
        if (!user) throw new Error("No account found with that email");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // Temporarily bypassed for development
        // if (!user.isVerified) throw new Error("Please verify your email before logging in");

        return { 
          id: user.id, 
          email: user.email, 
          name: user.profile?.fullName || user.userName, 
          type: user.type, 
          isOnboarded: user.isOnboarded
        };
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: authConfig.routes.signIn,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.type = user.type;
        token.isOnboarded = user.isOnboarded;
        
        // Generate a standard JWT compatible with the Express API middleware
        token.accessToken = jwt.sign(
          { id: user.id, email: user.email }, 
          process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "fallback_secret_do_not_use_in_prod",
          { expiresIn: '1d' }
        );
      }

      if (trigger === "update" && session) {
        if (session.isOnboarded !== undefined) {
          token.isOnboarded = session.isOnboarded;
        }
        if (session.name !== undefined) {
          token.name = session.name;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.type = token.type as string;
        session.user.isOnboarded = token.isOnboarded as boolean;
        session.accessToken = token.accessToken as string;
        (session.user as any).accessToken = token.accessToken as string;
        if (token.name) {
          session.user.name = token.name;
        }
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
