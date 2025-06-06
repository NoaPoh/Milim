import { z } from 'zod';
import { protectedProcedure, publicProcedure } from '../../core/trpc/trpc';
import { awardService, getFreeAnimals, purchase } from './award.service';
import { router } from '../../core/trpc/trpc';

export const awardRouter = router({
  getAll: publicProcedure.query(async ({ ctx}) => {
    return awardService.getAllAwards(ctx.prisma);
  }),
  activateAward: protectedProcedure
    .input(z.object({ awardId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await awardService.activateAward(ctx.prisma ,ctx.userId, input.awardId);
    }),
  purchase: protectedProcedure
    .input(z.object({ awardId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await purchase(ctx.userId, input.awardId, ctx.prisma);
    }),
  getFreeAnimals: publicProcedure.query(async ({ ctx, input }) => {
    return getFreeAnimals(ctx.prisma);
  }),
});