import { Animal, Category, Prisma, User, Word } from '@prisma/client';

export type DisplayCategory = Category & { picture: string };

export type MessageResponse = {
  message: string;
};

export interface RegisterInput {
  username: User['username'];
  email: User['email'];
  password: string;
  animalId: Animal['id'];
}

export interface LoginInput {
  email: User['email'];
  password: string;
}

export interface LoginResponse {
  userId: User['id'];
  // accessToken: string;
  // refreshToken: string;
}

export interface WinAGameInput {
  coins: number;
}

export type WordWithStringPic = Omit<Word, 'picture'> & {
  picture: string;
};

export type DisplayCategoryWithWords = Omit<DisplayCategory, 'words'> & {
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
}
