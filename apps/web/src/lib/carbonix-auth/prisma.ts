import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Standard Prisma client instantiation
// Neon pooler connections require pgbouncer=true. channel_binding is not supported by Prisma.
let datasourceUrl = process.env.DATABASE_URL;
if (datasourceUrl) {
  // Remove unsupported channel_binding param
  datasourceUrl = datasourceUrl.replace(/[&?]channel_binding=[^&]*/g, '');
  // Add pgbouncer=true for pooler connections (required for serverless)
  if (datasourceUrl.includes('pooler') && !datasourceUrl.includes('pgbouncer=true')) {
    datasourceUrl += (datasourceUrl.includes('?') ? '&' : '?') + 'pgbouncer=true';
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl,
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
