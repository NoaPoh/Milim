import { base } from './base';
import { isAuthed } from '../middlewares/auth.middleware';
import { advanceStreak } from '../middlewares/streak.middleware';

export const router = base.router;
export const middleware = base.middleware;
export const publicProcedure = base.procedure;
export const protectedProcedure = base.procedure
  .use(isAuthed)
  .use(advanceStreak);
