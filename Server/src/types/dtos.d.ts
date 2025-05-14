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

export interface WordWithStringPic {
  userId: number;
  text: string;
  categoryId: number;
  picture: string;
  id: number;
  discoveredAt: Date;
}
export interface GoogleTranslateResponse {
  data: {
    translations: Array<{
      translatedText: string;
      detectedSourceLanguage: string;
      model: string;
    }>;
  };
}

export type GoogleLabelAnnotation = {
  mid: string; // e.g. "/m/0bt9lr"
  description: string; // e.g. "banana"
  score: number; // confidence, 0–1
  topicality?: number; // often same as score
};

export type GoogleLabelDetectionResponse = {
  responses: Array<{
    labelAnnotations?: GoogleLabelAnnotation[];
  }>;
};

export interface UserDTO {
  username: string | null;
  currentStreak: number | null;
  longestStreak: number | null;
  lastUsedDate: string | null;
  spiritAnimal: string;
  coins: number;
}
