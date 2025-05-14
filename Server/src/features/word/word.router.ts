import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Word } from '@prisma/client';
import { saveWordInCategory, fetchRandomUserWords } from './word.service';
import { WordWithStringPic } from 'src/types';

export const wordRouter = router({
  fetchRandomUserWords: protectedProcedure
    .input(z.object({ amount: z.number(), categoryId: z.number().optional() }))
    .query(async ({ ctx, input }): Promise<WordWithStringPic[]> => {
      return await fetchRandomUserWords(
        ctx.userId,
        ctx.prisma,
        input.amount,
        input.categoryId
      );
    }),

  saveWordInCategory: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        categoryId: z.number(),
        picture: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { text, categoryId, picture } = input;
      return await saveWordInCategory(
        text,
        picture,
        ctx.userId,
        categoryId,
        ctx.prisma
      );
    }),
});
