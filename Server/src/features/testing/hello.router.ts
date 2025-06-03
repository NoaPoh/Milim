import { z } from 'zod';
import { publicProcedure, router } from '../../core/trpc/trpc';

export const helloRouter = router({
  world: publicProcedure.query(() => {
    return `Hello world `;
  }),
});
