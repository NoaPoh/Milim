import { z } from 'zod';
import { publicProcedure } from '../../core/trpc/trpc';
import { awardService } from './award.service';
import { Award, AwardType } from '@prisma/client';
import { router } from '../../core/trpc/trpc';

export const awardRouter = router({
  getAll: publicProcedure.query(async ({ ctx}) => {
    return awardService.getAllAwards(ctx.prisma);
  }),

  getByType: publicProcedure.input(z.nativeEnum(AwardType)).query(async ({ ctx, input  }) => {
    return awardService.getAwardsByType(ctx.prisma, input);
  }),
});