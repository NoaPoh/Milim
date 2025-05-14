import { PrismaClient, Word } from '@prisma/client';
import { base64ToUint8Array } from '../../utils/images.util';
import { Prisma } from '@prisma/client';

export const fetchRandomUserWords = async (
  userId: number,
  prisma: PrismaClient,
  amount: number = 10,
  categoryId?: number
): Promise<Word[]> => {
  const condition: Prisma.WordWhereInput = categoryId
    ? { userId, categoryId }
    : { userId };

  const userWords = await prisma.word.findMany({
    where: condition,
  });

  const uniqueWords: Word[] = userWords.reduce((acc: Word[], word) => {
    const existingWord = acc.find((w) => w.text === word.text);
    if (!existingWord) {
      acc.push(word);
    }
    return acc;
  }, []);

  const randomWords = uniqueWords
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

  const alreadyExists = await prisma.word.findFirst({
    where: {
      text,
      userId,
      categoryId,
    },
  });

  if (alreadyExists) {
    return alreadyExists;
  }

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
