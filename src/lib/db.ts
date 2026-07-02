import { PrismaClient } from "@prisma/client";

// Singleton Prisma client, created lazily so the module can be imported at
// build time (e.g. during `next build` on Vercel) without requiring a
// DATABASE_URL or a generated client. The actual connection is only opened
// when `db` is first used in a request.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error"],
  });
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
