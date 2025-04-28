import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import type { Category } from '@prisma/client';
import { fetchUserCategories, insertCategory } from './category.service';

export const CategoryRouter = router({
  fetchUserCategories: protectedProcedure.query(
    async ({ ctx }): Promise<Category[]> => {
      return await fetchUserCategories(ctx.userId, ctx.prisma);
    }
  ),
  insertCategory: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await insertCategory(ctx.userId, input.name, ctx.prisma);
    }),
});
