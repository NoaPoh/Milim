import { Award, AwardType, PrismaClient, Purchase, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const awardService = {
  getAllAwards: async (prisma: PrismaClient) => {
    return prisma.award.findMany();
  },

  activateAward: async (
    prisma: PrismaClient,
    userId: number,
    awardId: number
  ) => {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_awardId: {
          userId,
          awardId,
        },
      },
      include: {
        award: true,
      },
    });

    if (!purchase) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'You don’t own this award.',
      });
    }

    await prisma.purchase.update({
      where: {
        userId_awardId: {
          userId,
          awardId,
        },
      },
      data: {
        createdAt: new Date(),
      },
    });

    return { success: true };
  },
};
export const purchase = async (
  userId: number,
  awardId: number,
  prisma: PrismaClient
): Promise<Purchase> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  let award = (await prisma.award.findUnique({
    where: { id: awardId },
  })) as Award;

  if (!user) throw new Error('User not found');
  if (!award) throw new Error('Award not found');
  if (user.coinBalance < award.price) throw new Error('Not enough coins');

  const newPurchase = await prisma.purchase.create({
    data: {
      userId: user.id,
      awardId: award.id,
    },
  });

  return newPurchase;
};
