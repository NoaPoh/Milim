import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { isAuthed } from '../middlewares/auth.middleware';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);
