import { PrismaClient, Word } from '@prisma/client';
import { base64ToUint8Array } from '../../utils/images.util';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { WordWithStringPic } from 'src/types';

export const fetchRandomUserWords = async (
  userId: number,
  prisma: PrismaClient,
  amount: number = 10,
  categoryId?: number
): Promise<WordWithStringPic[]> => {
  const condition: Prisma.WordWhereInput = categoryId
    ? { userId, categoryId }
    : { userId };

  const userWords = await prisma.word.findMany({
    where: condition,
  });

  // if there is no category filtering, we need to remove
  // duplicates by text, so we can return a unique set of words
  const uniqueWords: Word[] =
    categoryId === undefined
      ? userWords.reduce((acc: Word[], word) => {
          const existingWord = acc.find((w) => w.text === word.text);
          if (!existingWord) {
            acc.push(word);
          }
          return acc;
        }, [])
      : userWords;

  const rightPicWords: WordWithStringPic[] = uniqueWords.map((word) => {
    const buffer = Buffer.from(word.picture);
    const base64Image = buffer.toString('base64');
    const picture = `data:image/png;base64,${base64Image}`;

    const objToUse = _.omit(word, 'picture');

    return {
      ...objToUse,
      picture,
    };
  });

  const randomWords = rightPicWords
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
