import { TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';
import { base } from '../trpc/base';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

export type JWTPayload = {
  userId: string;
};

export const isConnectedToDB = base.middleware<Context>(
  async ({ ctx, next }) => {
    try {
      await ctx.prisma.$queryRaw`SELECT 1`; // Test connectivity
      console.log('Successfully connected to the database.');

      return next();
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        console.error(
          'PrismaClientInitializationError: Could not connect to the database.'
        );
        console.error('Error details:', error.message);
        // Implement specific error handling here, e.g., retry logic, exit application.
      } else {
        console.error(
          'An unexpected error occurred during database connection:',
          error
        );
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database connection error',
      });
    }
  }
);
