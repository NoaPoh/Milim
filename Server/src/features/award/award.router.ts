import { z } from 'zod';
import { protectedProcedure, publicProcedure } from '../../core/trpc/trpc';
import { awardService } from './award.service';
import { router } from '../../core/trpc/trpc';

export const awardRouter = router({
  getAll: publicProcedure.query(async ({ ctx}) => {
    return awardService.getAllAwards(ctx.prisma);
  }),
  useAward: protectedProcedure
    .input(z.object({ awardId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await awardService.useAward(ctx.prisma ,ctx.userId, input.awardId);
    }),
});