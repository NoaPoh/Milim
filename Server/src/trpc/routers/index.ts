import { router } from '../trpc';
import { userRouter } from './word';

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
