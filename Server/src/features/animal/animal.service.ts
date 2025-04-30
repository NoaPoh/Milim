import { Animal, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export interface AnimalResponse {
  id: Animal['id'];
  name: Animal['name'];
  imagePath: Animal['imagePath'];
  price: Animal['price'];
}

export const getFreeAnimals = async (
  prisma: PrismaClient
): Promise<Animal[]> => {
  const animals = await prisma.animal.findMany({
    where: {
      price: 0,
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
