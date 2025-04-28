import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Word } from '@prisma/client';
import { translateWord } from './word.service';

export const wordRouter = router({
  fetchUserWords: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }): Promise<Word[]> => {
      return ctx.prisma.word.findMany({
        where: { userId: input.userId },
      });
    }),

  translateWord: protectedProcedure
    .input(z.object({ word: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await translateWord(input.word);
    }),
});
