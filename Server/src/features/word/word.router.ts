import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Word } from '@prisma/client';
import {
  saveWordInCategory,
  translateWord,
  fetchRandomUserWords,
} from './word.service';

export const wordRouter = router({
  fetchRandomUserWords: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }): Promise<Word[]> => {
      return await fetchRandomUserWords(ctx.userId, ctx.prisma, input.amount);
    }),
  translateWord: protectedProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ ctx, input }) => {
      return await translateWord(input.word);
    }),

  saveWordInCategory: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        userId: z.number(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await saveWordInCategory(
        input.text,
        ctx.userId,
        input.categoryId,
        ctx.prisma
      );
    }),
});
