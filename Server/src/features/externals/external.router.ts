import { protectedProcedure, router } from 'src/core/trpc/trpc';
import { z } from 'zod';
import { translateWord } from './googleTranslate/googleTranslate';
import { detectObjectFromBase64 } from './googleVision/googleVision';

export const externalsRouter = router({
  translateWord: protectedProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ ctx, input }) => {
      return await translateWord(input.word);
    }),
  detectObject: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await detectObjectFromBase64(input.image);
    }),
});
