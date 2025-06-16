import { z } from 'zod';
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '../../core/trpc/trpc';
import { login, logout, register } from './auth.service';

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  animalId: z.number(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      return register(ctx.prisma, input, ctx.res);
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    return login(ctx.prisma, input, ctx.res);
  }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    return logout(ctx.res);
  }),

  getMe: publicProcedure.query(async ({ ctx }) => {
    return { userId: ctx.userId };
  }),
});
