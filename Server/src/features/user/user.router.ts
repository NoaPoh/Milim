import { protectedProcedure, router } from 'src/core/trpc/trpc';
import { addCoinsToUser } from './user.service';
import { z } from 'zod';

export const userRouter = router({
  addCoinsToUser: protectedProcedure
    .input(z.object({ coins: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await addCoinsToUser(ctx.userId, input.coins, ctx.prisma);
    }),
});
