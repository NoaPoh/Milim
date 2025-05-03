import { protectedProcedure, router } from 'src/core/trpc/trpc';
import { winAGame } from './user.service';
import { z } from 'zod';

const winAGameSchema = z.object({
  coins: z.number(),
  addedStreak: z.number(),
});

export const userRouter = router({
  winAGame: protectedProcedure
    .input(winAGameSchema)
    .mutation(async ({ ctx, input }) => {
      return await winAGame(
        ctx.userId,
        input.coins,
        input.addedStreak,
        ctx.prisma
      );
    }),
});
