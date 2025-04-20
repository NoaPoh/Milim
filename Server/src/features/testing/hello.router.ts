import { protectedProcedure, router } from '../../core/trpc/trpc';

export const helloRouter = router({
  world: protectedProcedure.query(() => {
    return `Hello world `;
  }),
});
