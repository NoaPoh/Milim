import { PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { compare, genSalt, hash } from 'bcrypt';
import { Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import {
  LoginInput,
  LoginResponse,
  MessageResponse,
  RegisterInput,
} from '../../types/dtos';

const generateAccessToken = (userId: User['id']) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET || '', {
    expiresIn:
      (process.env.JWT_ACCESS_EXPIRATION as SignOptions['expiresIn']) || '15m',
  });
};

export const register = async (
  prisma: PrismaClient,
  input: RegisterInput
): Promise<User> => {
  const { email, username, password, animalId } = input;

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'User with this email already exists.',
    });
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash: hashedPassword,
      currentStreak: 0,
      lastUsedDate: new Date(),
      animalId,
    },
  });

  return newUser;
};

export const login = async (
  prisma: PrismaClient,
  input: LoginInput,
  res: Response
): Promise<LoginResponse> => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User with this email does not exist.',
    });
  }

  const isPasswordValid = await compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'invalid password.',
    });
  }

  const accessToken = generateAccessToken(user.id);

  res.cookie('access-token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { userId: user.id };
};

export const logout = async (res: Response): Promise<MessageResponse> => {
  res.clearCookie('access-token', { httpOnly: true, sameSite: 'strict' });
  return { message: 'Logged out successfully' };
};
