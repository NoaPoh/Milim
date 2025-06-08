import { Award, PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { UserDTO } from '../../types';
import { getActiveAwardsByCategory } from '../../utils/getActiveAwards';

export const winAGame = async (
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
    data: {
      coinBalance: user.coinBalance + coins,
    },
  });

  return updatedUser;
};

export const getUser = async (
  prisma: PrismaClient,
  id: number
): Promise<UserDTO> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      purchases: {
        select: {
          award: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
          createdAt: true,
          awardId: true,
        },
      },
    },
  });
  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'משתמש זה לא קיים אוי לי.',
    });
  }

  return {
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    username: user.username,
    coins: user.coinBalance,
    purchases: user.purchases,
    activeAwards: getActiveAwardsByCategory(user.purchases),
  };
};
