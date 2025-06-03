import { AwardType, PrismaClient } from '@prisma/client';

export const awardService = {
  getAllAwards: async (prisma: PrismaClient) => {
    return prisma.award.findMany();
  },

  getAwardsByType: async (prisma: PrismaClient, type: AwardType) => {
    return prisma.award.findMany({
      where: { category: type },
    });
  },
};
