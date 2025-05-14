import { Animal, Category, User, Word } from '@prisma/client';

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
