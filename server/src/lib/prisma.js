import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // you can add log: ['query','error'] for debugging
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
