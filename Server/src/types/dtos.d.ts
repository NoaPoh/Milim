import { Award, Category, Prisma, User, Word } from '@prisma/client';
import { ActiveAwards } from 'milim-client/src/constants/awards.types';

export type DisplayCategory = CategoryInList & {
  picture: string | 'loading';
};

export type CategoryInList = Omit<Category, 'picture'> & {
  hasThisWord: boolean;
};

export type IdentifiedPicture<T extends { id: unknown }> = {
  id: T['id'];
  picture: string;
};

export type MessageResponse = {
  message: string;
};

export interface RegisterInput {
  username: User['username'];
  email: User['email'];
  password: string;
  animalId: Award['id'];
}

export interface LoginInput {
  email: User['email'];
  password: string;
}

export interface LoginResponse {
  userId: User['id'];
}

export interface WinAGameInput {
  coins: number;
}

export type WordWithStringPic = Omit<Word, 'picture'> & {
  picture: string;
};

export type CategoryPageData = {
  id: Category['id'];
  name: Category['name'];
  words: WordWithStringPic[];
};

export type PrismaCategoryWithWords = Prisma.CategoryGetPayload<{
  include: {
    words: true;
  };
}>;

export interface UserDTO {
  username: string | null;
  currentStreak: number | null;
  longestStreak: number | null;
  coins: number;
  purchases: PurchaseDTO[];
  activeAwards: ActiveAwards;
}

export type PurchaseDTO = Pick<
  Prisma.PurchaseGetPayload<{
    include: {
      award: {
        select: {
          id: true;
          name: true;
          type: true;
        };
      };
    };
  }>,
  'award' | 'createdAt' | 'awardId'
>;
