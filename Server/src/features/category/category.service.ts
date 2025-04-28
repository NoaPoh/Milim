import { Category, PrismaClient } from '@prisma/client';
import { DisplayCategory } from '../../@types/dtos';

export const fetchUserCategories = async (
  userId: number,
  prisma: PrismaClient
): Promise<DisplayCategory[]> => {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { createdById: null }, // System categories
        { createdById: userId }, // User's own categories
      ],
    },
    include: {
      words: {
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

  const displayCategories: DisplayCategory[] = categories.map((category) => ({
    ...category,
    picture: category.words[0]?.picture,
  }));

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
