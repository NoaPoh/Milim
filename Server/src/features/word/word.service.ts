import { PrismaClient, Word } from '@prisma/client';
import { base64ToUint8Array } from '../../utils/images.util';

export const fetchRandomUserWords = async (
  userId: number,
  prisma: PrismaClient,
  amount: number = 10
): Promise<Word[]> => {
  const userWords = await prisma.word.findMany({
    where: { userId: userId },
  });

  const randomWords = userWords
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);

  return randomWords;
};

export const saveWordInCategory = async (
  text: string,
  picture: string,
  userId: number,
  categoryId: number,
  prisma: PrismaClient
): Promise<Word> => {
  const base64 = picture.replace(/^data:image\/\w+;base64,/, '');

  const buffer = base64ToUint8Array(base64);

  const newWord = await prisma.word.create({
    data: {
      text,
      userId,
      categoryId,
      discoveredAt: new Date(),
      picture: buffer, // Provide a default empty Uint8Array for the picture field
    },
  });

  return newWord;
};
