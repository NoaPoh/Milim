import { Category, Prisma, PrismaClient, Word } from '@prisma/client';
import { PrismaCategoryWithWords, DisplayCategory, DisplayCategoryWithWords } from '../../types';
import { SYSTEM_USER_ID } from '../../utils/constants';
import _, { omit } from 'lodash';

export const fetchUserCategories = async (
  userId: number,
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
          userId
        },
        take: 1, // Only fetch one word
        orderBy: {
          discoveredAt: 'asc',
        },
        select: {
          picture: true,
        },
      },
    },
  });

  const displayCategories: DisplayCategory[] = categories.map((category) => {
    let picture = '';

    if (category.words.length !== 0) {
      picture = formatImageWithBuffer(category?.words[0].picture);
    }

    const CategoryObjToUse = _.omit(category, 'words');

    return {
      ...CategoryObjToUse,
      picture,
    };
  });

  return displayCategories;
};

export const fetchUserCategoryById = async (
  userId: number,
  prisma: PrismaClient,
  categoryId: number,
): Promise<DisplayCategoryWithWords> => {
  const category: PrismaCategoryWithWords | null = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      words: {
        orderBy: {
          discoveredAt: 'asc',
        }
      },
    },
  });
  if (!category) {
    throw new Error('Category not found');
  }

  const newCategory: DisplayCategoryWithWords = {
    ...omit(category, ['words']),
    picture: '',
    words: [] };

  if (category.words.length !== 0) {
    newCategory.picture = formatImageWithBuffer(category?.words[0].picture);
    newCategory.words = category.words.map((word: Word) => {
      return {
        ...word,
        picture: formatImageWithBuffer(word.picture),
      };
    });
  }

  return newCategory;
};

export const insertCategory = async (
  userId: number,
  name: string,
  prisma: PrismaClient,
): Promise<Category> => {
  const newCategory = await prisma.category.create({
    data: {
      name: name,
      createdById: userId,
    },
  });

  return newCategory;
};

const formatImageWithBuffer = (picture: Uint8Array<ArrayBufferLike>): string => {
  const buffer = Buffer.from(picture);
  const base64Image = buffer.toString('base64');
  return base64Image;
}