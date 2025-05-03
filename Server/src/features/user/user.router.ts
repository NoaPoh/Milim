import { protectedProcedure, publicProcedure, router } from '../../core/trpc/trpc';
import { addCoinsToUser, getUser, winAGame } from './user.service';
import { z } from 'zod';

const winAGameSchema = z.object({
  coins: z.number(),
});

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
  winAGame: protectedProcedure
    .input(winAGameSchema)
    .mutation(async ({ ctx, input }) => {
      return await winAGame(ctx.userId, input.coins, ctx.prisma);
    }),
});
