import { PrismaClient, Word } from '@prisma/client';
import {
  base64ToUint8Array,
  dataURLToBase64,
  uint8ArrayToClientReadyImage,
} from '../../utils/images.util';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { IdentifiedPicture, WordWithStringPic } from '../../types';

export const fetchRandomUserWords = async (
  userId: number,
  prisma: PrismaClient,
  amount: number = 10,
  categoryId?: number,
  noSpaceLimitation?: boolean,
  charsLimitation?: number
): Promise<WordWithStringPic[]> => {
  const condition: Prisma.WordWhereInput = {
    userId,
    ...(categoryId ? { categoryId } : {}),
    ...(noSpaceLimitation
      ? {
          NOT: {
            originalText: {
              contains: ' ',
            },
          },
        }
      : {}),
  };

  const userWords = await prisma.word.findMany({
    where: condition,
  });

  // de-duplicate if needed
  const uniqueWords: Word[] =
    categoryId === undefined
      ? userWords.reduce((acc: Word[], word) => {
          const existingWord = acc.find(
            (w) => w.originalText === word.originalText
          );
          if (!existingWord) {
            acc.push(word);
          }
          return acc;
        }, [])
      : userWords;

  // convert picture buffers to base64
  const rightPicWords: WordWithStringPic[] = uniqueWords.map((word) => {
    const picture = uint8ArrayToClientReadyImage(word.picture);
    const objToUse = _.omit(word, 'picture');
    return { ...objToUse, picture };
  });

  // Filter by char length
  const filteredWords = rightPicWords.filter((word) => {
    const text = word.originalText;
    return typeof charsLimitation === 'number'
      ? text.length <= charsLimitation
      : true;
  });

  const randomWords = filteredWords
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);

  return randomWords;
};

export const saveWordInCategory = async (
  originalText: string,
  translatedText: string,
  picture: string,
  categoryId: number,
  userId: number,
  prisma: PrismaClient
): Promise<Word> => {
  const base64 = dataURLToBase64(picture);

  const pictureBuffer = base64ToUint8Array(base64);

  const alreadyExists = await prisma.word.findFirst({
    where: {
      originalText,
      userId,
      categoryId,
    },
  });

  if (alreadyExists) {
    return alreadyExists;
  }

  const newWord = await prisma.word.create({
    data: {
      originalText,
      translatedText,
      userId,
      categoryId,
      discoveredAt: new Date(),
      picture: pictureBuffer,
    },
  });

  return newWord;
};

export const getWordSum = async (
  userId: number,
  prisma: PrismaClient
): Promise<number> => {
  const wordCount = await prisma.word.count({
    where: {
      userId,
    },
  });

  return wordCount;
};

export const fetchWordsPicturesByIds = async (
  userId: number,
  ids: number[],
  prisma: PrismaClient
): Promise<IdentifiedPicture<Word>[]> => {
  const words = await prisma.word.findMany({
    select: {
      id: true,
      picture: true,
    },
    where: {
      userId,
      id: {
        in: ids,
      },
    },
  });

  const idedPictures: IdentifiedPicture<Word>[] = words.map((word) => {
    const picture = uint8ArrayToClientReadyImage(word.picture);
    const objToUse = _.omit(word, 'picture');
    return { ...objToUse, picture };
  });

  return idedPictures;
};
