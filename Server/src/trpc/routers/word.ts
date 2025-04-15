import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import prisma from '../../prisma/prismaClient';
import type { Word } from '@prisma/client';

export const wordRouter = router({
  fetchUserWords: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }): Promise<Word[]> => {
      return prisma.word.findMany({
        where: { userId: input.userId },
      });
    }),
  insertWord: publicProcedure
    .input(z.object({ userId: z.number(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      const categoryId = 1; // TODO: figure out
      const newWord = prisma.word.create({
        data: {
          userId: input.userId,
          text: input.text,
          categoryId,
        },
      });

      return newWord;
    }),
});
