import { Animal, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { compare, genSalt, hash } from 'bcrypt';
import { Response } from 'express';
import { MessageResponse } from '../../@types/types';

export interface AnimalResponse {
  id: Animal['id'];
  name: Animal['name'];
  imagePath: Animal['imagePath'];
  price: Animal['price'];
  // users: Animal['users'];

  // accessToken: string;
  // refreshToken: string;
}

export const getFreeAnimals = async (
  prisma: PrismaClient
): Promise<Animal[]> => {
  const animals = await prisma.animal.findMany({
    where: {
      price: 0,
    },
  });
  if (!animals) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'No free animals found.',
    });
  }
  return animals;
};
