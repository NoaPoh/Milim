import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createContext() {
  return { prisma }; // You can put auth/user/session info here later
}

export type Context = Awaited<ReturnType<typeof createContext>>;
