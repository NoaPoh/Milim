import { Category, PrismaClient } from '@prisma/client';
import { DisplayCategory } from '../../types/dtos';
import { SYSTEM_USER_ID } from '../../utils/constants';
import _ from 'lodash';

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
      const buffer = Buffer.from(category.words[0].picture);
      const base64Image = buffer.toString('base64');
      picture = base64Image;
    }

    const CategoryObjToUse = _.omit(category, 'words');

    return {
      ...CategoryObjToUse,
      picture,
    };
  });

  return displayCategories;
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
