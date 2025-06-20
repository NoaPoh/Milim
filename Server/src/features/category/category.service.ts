import { Category, PrismaClient, Word } from '@prisma/client';
import {
  DisplayCategory,
  CategoryPageData,
  IdentifiedPicture,
  CategoryInList,
} from '../../types';
import { SYSTEM_USER_ID } from '../../utils/constants';
import _ from 'lodash';
import { uint8ArrayToClientReadyImage } from '../../utils/images.util';

export const fetchCategoriesPictures = async (
  userId: number,
  categoriesIds: Category['id'][],
  prisma: PrismaClient
): Promise<IdentifiedPicture<Category>[]> => {
  const categories = await prisma.category.findMany({
    where: {
      id: { in: categoriesIds },
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
          id: true,
          picture: true,
        },
      },
    },
  });

  const categoriesPictures: IdentifiedPicture<Category>[] = categories.map(
    (category) => {
      let picture: string = '';

      if (category.words.length !== 0) {
        picture = uint8ArrayToClientReadyImage(category.words[0].picture);
      }

      return {
        id: category.id,
        picture,
      };
    }
  );

  return categoriesPictures;
};

export const fetchUserCategories = async (
  userId: number,
  wordToAdd: string | undefined,
  prisma: PrismaClient
): Promise<CategoryInList[]> => {
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
      },
    },
  });

  const displayCategories: CategoryInList[] = categories.map((category) => {
    const CategoryObjToUse = _.omit(category, 'words');

    return {
      ...CategoryObjToUse,
      hasThisWord: !wordToAdd
        ? false
        : category.words.some((word) => word.translatedText === wordToAdd),
    };
  });

  return displayCategories;
};

export const fetchCategoryById = async (
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
    words: category.words,
  };

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
