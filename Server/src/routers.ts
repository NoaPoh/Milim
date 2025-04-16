import { router } from './core/trpc/trpc';
import { helloRouter } from './features/testing/hello.router';
import { wordRouter } from './features/word/word.router';
import { authRouter } from './features/auth/auth.router';

export const appRouter = router({
  word: wordRouter,
  hello: helloRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
