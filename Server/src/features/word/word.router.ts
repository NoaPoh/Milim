import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Word } from '@prisma/client';
import { saveWordInCategory, fetchRandomUserWords } from './word.service';
import { WordWithStringPic } from '../../types';

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
        originalText: z.string(),
        translatedText: z.string(),
        categoryId: z.number(),
        picture: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { originalText, translatedText, categoryId, picture } = input;
      return await saveWordInCategory(
        originalText,
        translatedText,
        picture,
        categoryId,
        ctx.userId,
        ctx.prisma
      );
    }),
});
