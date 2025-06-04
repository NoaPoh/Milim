import { Award, Category, Prisma, User, Word } from '@prisma/client';

export type DisplayCategory = Category & { picture: string };

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
  lastUsedDate: string | null;
  spiritAnimal: string;
  coins: number;
  purchases: PurchaseDTO[];
}

export type PurchaseDTO = Pick<
  Prisma.PurchaseGetPayload<{
    include: { award: true };
  }>,
  'award' | 'createdAt'
>;
