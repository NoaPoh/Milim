import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import { getFreeAnimals } from './animal.service';

export const animalRouter = router({
  getFreeAnimals: protectedProcedure.mutation(async ({ ctx, input }) => {
    return getFreeAnimals(ctx.prisma);
  }),
});
