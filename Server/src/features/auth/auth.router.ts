import { z } from 'zod';
import { publicProcedure, router } from '../../core/trpc/trpc';
import { register } from './auth.service';

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      return register(ctx.prisma, input);
    }),
});
