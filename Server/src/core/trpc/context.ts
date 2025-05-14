import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { DEFAULT_USER_ID } from '../../utils/constants';

const prisma = new PrismaClient();

export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions): Context => {
  return {
    prisma,
    req,
    res,
    userId: DEFAULT_USER_ID,
  };
};

export type Context = {
  req: CreateExpressContextOptions['req'];
  res: CreateExpressContextOptions['res'];
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userId: number;
};
