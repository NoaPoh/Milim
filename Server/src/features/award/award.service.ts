import { AwardType, PrismaClient } from '@prisma/client';

export const awardService = {
  getAllAwards: async (prisma: PrismaClient) => {
    return prisma.award.findMany();
  },

  useAward: async (prisma: PrismaClient, userId: number, awardId: number) => {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_awardId: {
          userId,
          awardId,
        },
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
