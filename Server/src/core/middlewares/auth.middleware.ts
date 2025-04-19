import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { Context } from '../trpc/context';
import { middleware } from '../trpc/trpc';

export type JWTPayload = {
  userId: string;
};

export const isAuthed = middleware<Context>(({ ctx, next }) => {
  const token = ctx.req.cookies.token;
  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || ''
    ) as JWTPayload;

    if (!payload) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        ...ctx,
        userId: payload.userId,
      },
    });
  } catch {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});
