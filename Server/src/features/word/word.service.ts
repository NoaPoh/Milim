import { PrismaClient, Word } from '@prisma/client';
import { translateWord as googleTranslate } from '../../externalAPIs/googleTranslate/googleTranslate';

export const fetchRandomUserWords = async (
  userId: number,
  prisma: PrismaClient,
  amount: number = 10
) => {
  const userWords = await prisma.word.findMany({
    where: { userId: userId },
  });

  const randomWords = userWords
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);

  return randomWords;
};

export const translateWord = async (word: string): Promise<string> => {
  return await googleTranslate(word);
};

export const saveWordInCategory = async (
  text: string,
  userId: number,
  categoryId: number,
  prisma: PrismaClient
): Promise<Word> => {
  const newWord = await prisma.word.create({
    data: {
      text,
      userId,
      categoryId,
      discoveredAt: new Date(),
      picture: new Uint8Array(), // Provide a default empty Uint8Array for the picture field
    },
  });
  return newWord;
};
