import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';

export const helloRouter = router({
  world: protectedProcedure
    .input(z.object({ userName: z.string() }))
    .query(({ input }) => {
      return `Hello world ${input.userName}`;
    }),
});
