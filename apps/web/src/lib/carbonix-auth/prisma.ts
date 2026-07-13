import { PrismaClient } from "@/generated/prisma";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Standard Prisma client instantiation without adapter since it runs in Node.js
// and @prisma/adapter-pg has a version mismatch issue.
let datasourceUrl = process.env.DATABASE_URL;
if (datasourceUrl && datasourceUrl.includes('pooler') && !datasourceUrl.includes('pgbouncer=true')) {
  datasourceUrl += (datasourceUrl.includes('?') ? '&' : '?') + 'pgbouncer=true';
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl,
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
