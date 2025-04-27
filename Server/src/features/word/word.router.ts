import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Word } from '@prisma/client';

export const wordRouter = router({
  fetchUserWords: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ ctx, input }): Promise<Word[]> => {
      return ctx.prisma.word.findMany({
        where: { userId: input.userId },
      });
    }),
});
