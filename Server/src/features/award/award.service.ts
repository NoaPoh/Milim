import { Award, AwardType, PrismaClient, Purchase, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

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
    if (purchase.award.category === AwardType.PROFILE_ICON)
      await prisma.user.update({
        where: { id: userId },
        data: { animalId: awardId },
      });

    return { success: true };
  },
};
export const purchase = async (
  userId: number,
  awardId: number,
  prisma: PrismaClient,
): Promise<Purchase> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  let award = await prisma.award.findUnique({ where: { id: awardId } }) as Award;

  if (!user) throw new Error('User not found');
  if (!award) throw new Error('Award not found');
  if (user.coinBalance < award.price) throw new Error('Not enough coins');

  const newPurchase = await prisma.purchase.create({
    data: {
      userId: user.id,
      awardId: award.id,
    },
  });

  await updateUserInfoAfterPurchase(award, user, prisma);

  return newPurchase;
};

async function updateUserInfoAfterPurchase(
  award: Award, user: User,
  prisma: PrismaClient,
) {

  const data: any = { coinBalance: user.coinBalance - award.price };
  if (award.category === AwardType.PROFILE_ICON) data['animalId'] = award.id;

  await prisma.user.update({
    where: { id: user.id },
    data,
  });
}