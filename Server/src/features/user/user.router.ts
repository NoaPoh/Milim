import { protectedProcedure, router } from '../../core/trpc/trpc';
import { winAGame } from './user.service';
import { z } from 'zod';

const winAGameSchema = z.object({
  coins: z.number(),
});

export const userRouter = router({
  winAGame: protectedProcedure
    .input(winAGameSchema)
    .mutation(async ({ ctx, input }) => {
      return await winAGame(ctx.userId, input.coins, ctx.prisma);
    }),
});
