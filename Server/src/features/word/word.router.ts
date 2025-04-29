import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Word } from '@prisma/client';
import { fetchRandomUserWords } from './word.service';

export const wordRouter = router({
  fetchRandomUserWords: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(async ({ ctx, input }): Promise<Word[]> => {
      return await fetchRandomUserWords(ctx.userId, ctx.prisma, input.amount);
    }),
});
