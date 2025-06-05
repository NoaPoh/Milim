import { router } from './core/trpc/trpc';
import { helloRouter } from './features/testing/hello.router';
import { wordRouter } from './features/word/word.router';
import { authRouter } from './features/auth/auth.router';
import { categoryRouter } from './features/category/category.router';
import { userRouter } from './features/user/user.router';
import { externalsRouter } from './features/externals/external.router';
import { awardRouter } from './features/award/award.router';

export const appRouter = router({
  word: wordRouter,
  hello: helloRouter,
  auth: authRouter,
  category: categoryRouter,
  user: userRouter,
  externals: externalsRouter,
  award: awardRouter,
});

export type AppRouter = typeof appRouter;
