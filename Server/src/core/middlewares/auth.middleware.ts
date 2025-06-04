import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { Context } from '../trpc/context';
import { base } from '../trpc/base';
import { DEFAULT_USER_ID } from '../../utils/constants';

export type JWTPayload = {
  userId: string;
};

export const isAuthed = base.middleware<Context>(({ ctx, next }) => {
  if (process.env.DISABLE_SECURITY === 'true') {
    return next({
      ctx: {
        ...ctx,
        userId: DEFAULT_USER_ID,
      },
    });
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
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});
