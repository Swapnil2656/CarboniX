import { PrismaClient } from "@/generated/prisma";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Standard Prisma client instantiation without adapter since it runs in Node.js
// and @prisma/adapter-pg has a version mismatch issue.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
