import { PrismaClient, User } from '@prisma/client';

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
