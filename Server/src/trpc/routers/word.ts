import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import prisma from '../../prisma/prismaClient';

export const userRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        message: `Hello ${input.name}`,
      };
    }),
  fetchUserWords: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }) => {
      return prisma.word.findFirst({
        where: { userId: input.userId },
      });
    }),
  insertWord: publicProcedure
    .input(z.object({ userId: z.number(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      const categoryId = 1; // TODO: figure out
      return prisma.word.create({
        data: {
          userId: input.userId,
          text: input.text,
          categoryId,
        },
      });
    }),
});
