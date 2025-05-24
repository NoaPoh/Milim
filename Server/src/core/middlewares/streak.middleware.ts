import { TRPCError } from '@trpc/server';
import { Context } from '../trpc/context';
import { base } from '../trpc/base';
import { isSameDay, isYesterday } from 'date-fns';

export const advanceStreak = base.middleware<Context>(async ({ ctx, next }) => {
  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.userId },
  });

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const today = new Date();
  const lastUsedDate = user.lastUsedDate;

  if (!lastUsedDate || isYesterday(lastUsedDate)) {
    const newStreak = (user.currentStreak || 0) + 1;
    const newLongest = Math.max(user.longestStreak || 0, newStreak);

    await ctx.prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastUsedDate: today,
      },
    });
  } else if (!isSameDay(lastUsedDate, today)) {
    // More than a day has passed → reset streak
    await ctx.prisma.user.update({
      where: { id: user.id },
      data: {
        currentStreak: 1,
        lastUsedDate: today,
      },
    });
  }

  return next();
});
