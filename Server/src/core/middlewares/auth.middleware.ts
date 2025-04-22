import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { Context } from '../trpc/context';
import { base } from '../trpc/base';

export type JWTPayload = {
  userId: string;
};

export const isAuthed = base.middleware<Context>(({ ctx, next }) => {
  if (ctx.req.url.includes('/auth') || ctx.req.url.includes('/hello')) {
    return next();
  }

  const token = ctx.req.cookies['access-token'];

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
