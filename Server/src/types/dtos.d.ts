import { Category, User, Word } from '@prisma/client';

export type DisplayCategory = Category & { picture: string };

export type MessageResponse = {
  message: string;
};

export interface RegisterInput {
  username: User['username'];
  email: User['email'];
  password: string;
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
