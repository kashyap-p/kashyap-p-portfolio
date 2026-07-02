import { PrismaClient } from "@prisma/client";

// Singleton Prisma client, created LAZILY on first actual use (not at module
// import time). This lets the module be imported during `next build` (e.g. on
// Vercel, where DATABASE_URL is unset) without instantiating PrismaClient and
// throwing. The client is only created when a route actually calls
// `db.contactMessage.create(...)` etc.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error"],
  });
}

function getDb(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Proxy defers PrismaClient construction until the first property access.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getDb();
    const value = Reflect.get(client, prop);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
