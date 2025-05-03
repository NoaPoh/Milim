import { Animal, PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { UserDTO } from '../../types';

export const addCoinsToUser = async (
  userId: number,
  coins: number,
  prisma: PrismaClient
): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { coinBalance: user.coinBalance + coins },
  });

  return updatedUser;
};

export const getUser = async (
  prisma: PrismaClient,
  id: number,
): Promise<Partial<UserDTO>> => {

  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User with this id does not exist.',
    });
  }

  const animal: Animal['imagePath'] = (await prisma.animal.findUnique({
    where: { id: user.animalId || 0 }
  }))?.imagePath || 'giraffe.png';

  return { spiritAnimal: animal, username: user.username, coins: user.coinBalance };
};