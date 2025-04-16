import { PrismaClient, User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

export interface RegisterInput {
  username: User['username'];
  email: User['email'];
  password: string;
}

export const register = async (
  prisma: PrismaClient,
  input: RegisterInput
): Promise<User> => {
  const { email, username, password } = input;

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing) {
    throw new Error('User with this email already exists.');
  }

  // Hash password
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash: hashedPassword,
      currentStreak: 0,
      lastUsedDate: new Date(),
    },
  });

  return newUser;
};
