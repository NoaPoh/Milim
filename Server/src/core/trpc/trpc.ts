import { base } from './base';
import { isAuthed } from '../middlewares/auth.middleware';
import { advanceStreak } from '../middlewares/streak.middleware';
import { isConnectedToDB } from '../middlewares/dbConnection.middleware';

export const router = base.router;
export const middleware = base.middleware;
export const publicProcedure = base.procedure.use(isConnectedToDB);
export const protectedProcedure = base.procedure
  .use(isConnectedToDB)
  .use(isAuthed)
  .use(advanceStreak);
