import { z } from 'zod';
import { protectedProcedure, router } from '../../core/trpc/trpc';
import { login, logout, register } from './auth.service';

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const authRouter = router({
  register: protectedProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      return register(ctx.prisma, input);
    }),

  login: protectedProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      return login(ctx.prisma, input, ctx.res);
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    return logout(ctx.res);
  }),

  getMe: protectedProcedure.query(async ({ ctx }) => {
    return { userId: ctx.userId };
  }),
});
