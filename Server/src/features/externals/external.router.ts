import { protectedProcedure, router } from '../../core/trpc/trpc';
import { z } from 'zod';
import { translateWord } from './googleTranslate';
import { detectObjectFromBase64 } from './googleVision';

export const externalsRouter = router({
  translateWord: protectedProcedure
    .input(z.object({ word: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (input.word) return await translateWord(input.word);
    }),
  detectObject: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await detectObjectFromBase64(input.image);
    }),
});
