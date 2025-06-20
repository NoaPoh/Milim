import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
// import type { Word } from '@prisma/client';
import {
  saveWordInCategory,
  fetchRandomUserWords,
  getWordSum,
  fetchWordsPicturesByIds,
} from './word.service';
import { WordWithStringPic } from '../../types';

export const wordRouter = router({
  fetchRandomUserWords: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        categoryId: z.number().optional(),
        noSpaceLimitation: z.boolean().optional(),
        charsLimitation: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }): Promise<WordWithStringPic[]> => {
      return await fetchRandomUserWords(
        ctx.userId,
        ctx.prisma,
        input.amount,
        input.categoryId,
        input.noSpaceLimitation,
        input.charsLimitation
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

  getWordSum: protectedProcedure.query(async ({ ctx }) => {
    const wordSum = await getWordSum(ctx.userId, ctx.prisma);
    return wordSum;
  }),

  fetchWordsPictures: protectedProcedure
    .input(z.array(z.number()))
    .query(async ({ ctx, input }) => {
      return await fetchWordsPicturesByIds(ctx.userId, input, ctx.prisma);
    }),
});
