import { publicProcedure, router } from '../../core/trpc/trpc';
import { getFreeAnimals } from './animal.service';

export const animalRouter = router({
  getFreeAnimals: publicProcedure.query(async ({ ctx, input }) => {
    return getFreeAnimals(ctx.prisma);
  }),
});
