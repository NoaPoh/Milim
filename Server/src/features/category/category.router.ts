import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import {
  fetchUserCategories,
  fetchUserCategoryById,
  insertCategory,
} from './category.service';
import { DisplayCategory, CategoryPageData } from '../../types';

export const categoryRouter = router({
  fetchUserCategories: protectedProcedure
    .input(z.object({ wordToAdd: z.string().optional() }))
    .query(async ({ ctx, input }): Promise<DisplayCategory[]> => {
      return await fetchUserCategories(ctx.userId, input.wordToAdd, ctx.prisma);
    }),
  fetchUserCategoryById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }): Promise<CategoryPageData> => {
      return await fetchUserCategoryById(ctx.userId, ctx.prisma, input.id);
    }),
  insertCategory: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await insertCategory(ctx.userId, input.name, ctx.prisma);
    }),
});
