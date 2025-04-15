import { router } from '../trpc';
import { helloRouter } from './helloWorld';
import { wordRouter } from './word';

export const appRouter = router({
  word: wordRouter,
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
