import { router } from './core/trpc/trpc';
import { helloRouter } from './features/testing/helloWorld';
import { wordRouter } from './features/word/word';
import { authRouter } from './features/auth/auth';

export const appRouter = router({
  word: wordRouter,
  hello: helloRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
