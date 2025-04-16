import { z } from 'zod';
import { publicProcedure, router } from '../../core/trpc/trpc';

export const helloRouter = router({
  world: publicProcedure
    .input(z.object({ userName: z.string() }))
    .query(({ input }) => {
      return `Hello world ${input.userName}`;
    }),
});
