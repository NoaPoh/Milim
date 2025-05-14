import { router } from './core/trpc/trpc';
import { helloRouter } from './features/testing/hello.router';
import { wordRouter } from './features/word/word.router';
import { authRouter } from './features/auth/auth.router';
import { categoryRouter } from './features/category/category.router';
import { animalRouter } from './features/animal/animal.router';
import { userRouter } from './features/user/user.router';
import { externalsRouter } from './features/externals/external.router';

export const appRouter = router({
  word: wordRouter,
  hello: helloRouter,
  auth: authRouter,
  category: categoryRouter,
  animal: animalRouter,
  user: userRouter,
  externals: externalsRouter,
});

export type AppRouter = typeof appRouter;
