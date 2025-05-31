import { Award, PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { UserDTO } from '../../types';

export const winAGame = async (
  userId: number,
  coins: number,
  prisma: PrismaClient,
): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      coinBalance: user.coinBalance + coins,
    },
  });

  return updatedUser;
};

export const getUser = async (
  prisma: PrismaClient,
  id: number,
): Promise<Partial<UserDTO>> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      purchases: {
        include: {
          award: {
            select: {
              id: true,
              name: true,
              category: true,
            },
          },
        },
      },
    },
  });
  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User with this id does not exist.',
    });
  }

  const animal: Award['iconUrl'] =
    (
      await prisma.award.findUnique({
        where: { id: user.animalId || 0 },
      })
    )?.iconUrl || '/animals/giraffe.png';

  return {
    spiritAnimal: animal,
    username: user.username,
    coins: user.coinBalance,
    purchases: user.purchases,
  };
};
