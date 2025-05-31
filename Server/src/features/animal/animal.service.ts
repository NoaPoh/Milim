import { Award, AwardType, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const getFreeAnimals = async (
  prisma: PrismaClient
): Promise<Award[]> => {
  const animals = await prisma.award.findMany({
    where: {
      price: 0,
      category: AwardType.PROFILE_ICON,
    },
  });
  if (!animals) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'No free animals found.',
    });
  }
  return animals;
};
