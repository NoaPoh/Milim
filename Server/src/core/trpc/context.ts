import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

const prisma = new PrismaClient();

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions): Context => {
  return {
    prisma,
    req,
    res,
    userId: -1,
  };
};

export type Context = {
  req: CreateExpressContextOptions['req'];
  res: CreateExpressContextOptions['res'];
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userId: number;
};
