import { Category, PrismaClient, Word } from '@prisma/client';
import { DisplayCategory, CategoryPageData } from '../../types';
import { SYSTEM_USER_ID } from '../../utils/constants';
import _ from 'lodash';
import { uint8ArrayToClientReadyImage } from '../../utils/images.util';

export const fetchUserCategories = async (
  userId: number,
  wordToAdd: string | undefined,
  prisma: PrismaClient
): Promise<DisplayCategory[]> => {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { createdById: SYSTEM_USER_ID }, // System categories
        { createdById: userId }, // User's own categories
      ],
    },
    include: {
      words: {
        where: {
          userId,
        },
        take: 1, // Only fetch one word
        orderBy: {
          discoveredAt: 'asc',
        },
        select: {
          translatedText: true,
          picture: true,
        },
      },
    },
  });

  const displayCategories: DisplayCategory[] = categories.map((category) => {
    const picture =
      category.words.length !== 0
        ? uint8ArrayToClientReadyImage(category.words[0].picture)
        : '';

    const CategoryObjToUse = _.omit(category, 'words');

    return {
      ...CategoryObjToUse,
      picture,
      hasThisWord: !wordToAdd
        ? false
        : category.words.some((word) => word.translatedText === wordToAdd),
    };
  });

  return displayCategories;
};

export const fetchUserCategoryById = async (
  userId: number,
  prisma: PrismaClient,
  categoryId: number
): Promise<CategoryPageData> => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      words: {
        where: {
          userId,
        },
        orderBy: {
          discoveredAt: 'asc',
        },
      },
    },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  const newCategory: CategoryPageData = {
    id: category.id,
    name: category.name,
    words: [],
  };

  if (category.words.length !== 0) {
    newCategory.words = category.words.map((word: Word) => ({
      ...word,
      picture: uint8ArrayToClientReadyImage(word.picture),
    }));
  }

  return newCategory;
};

export const insertCategory = async (
  userId: number,
  name: string,
  prisma: PrismaClient
): Promise<Category> => {
  const newCategory = await prisma.category.create({
    data: {
      name: name,
      createdById: userId,
    },
  });

  return newCategory;
};
