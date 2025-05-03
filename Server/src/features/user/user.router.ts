import { protectedProcedure, publicProcedure, router } from '../../core/trpc/trpc';
import { addCoinsToUser, getUser } from './user.service';
import { z } from 'zod';

export const userRouter = router({
  getUser: publicProcedure
    .query(async ({ ctx}) => {
      return getUser(ctx.prisma, ctx.userId);
    }),
  addCoinsToUser: protectedProcedure
    .input(z.object({ coins: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await addCoinsToUser(ctx.userId, input.coins, ctx.prisma);
    }),
});
