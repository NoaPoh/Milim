import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';

export const helloRouter = router({
  world: protectedProcedure.input(z.object({ a: z.number() })).query(() => {
    return `Hello world `;
  }),
});
