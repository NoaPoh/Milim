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
