import { PrismaClient } from '@prisma/client';
import { translateWord as googleTranslate } from '../../externalAPIs/googleTranslate/googleTranslate';
import { detectLabelFromBase64 } from '../../externalAPIs/googleVision/googleVision';

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

export const detectLabel = async (image: string) => {
  return await detectLabelFromBase64(image);
};
