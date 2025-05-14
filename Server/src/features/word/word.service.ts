import { PrismaClient, Word } from '@prisma/client';
import {
  base64ToUint8Array,
  dataURLToBase64,
  uint8ArrayToClientReadyImage,
} from '../../utils/images.util';
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
    const picture = uint8ArrayToClientReadyImage(word.picture);

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
  const base64 = dataURLToBase64(picture);

  const pictureBuffer = base64ToUint8Array(base64);

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
      picture: pictureBuffer,
    },
  });

  return newWord;
};
