import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import {
  fetchUserCategories,
  fetchCategoryById,
  insertCategory,
  fetchCategoriesPictures,
} from './category.service';
import {
  DisplayCategory,
  CategoryPageData,
  IdentifiedPicture,
  CategoryInList,
} from '../../types';
import { Category } from '@prisma/client';

export const categoryRouter = router({
  fetchUserCategories: protectedProcedure
    .input(z.object({ wordToAdd: z.string().optional() }))
    .query(async ({ ctx, input }): Promise<CategoryInList[]> => {
      return await fetchUserCategories(ctx.userId, input.wordToAdd, ctx.prisma);
    }),

  fetchCategoriesPictures: protectedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ ctx, input }): Promise<IdentifiedPicture<Category>[]> => {
      return await fetchCategoriesPictures(ctx.userId, input.ids, ctx.prisma);
    }),

  fetchCategoryById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }): Promise<CategoryPageData> => {
      return await fetchCategoryById(ctx.userId, ctx.prisma, input.id);
    }),

  insertCategory: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await insertCategory(ctx.userId, input.name, ctx.prisma);
    }),
});
