import { PrismaClient } from '@prisma/client';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

const prisma = new PrismaClient();

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    prisma,
    req,
    res,
    userId: '',
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
