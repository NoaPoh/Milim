import { QueryClient } from '@tanstack/react-query';
import { TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import { AppRouter } from '../../../../Server/src/routers';

// this is a trpc middleware, which intercepts transaction
// to invalidate user cache after any change in entity
export const resetUserCacheAfterChange = (
  queryClient: QueryClient
): TRPCLink<AppRouter> => {
  return () =>
    ({ op, next }) => {
      return observable((observer) => {
        const subscription = next(op).subscribe({
          next: async (result) => {
            if (op.path.startsWith('user.') && result.result?.type === 'data') {
              await queryClient.invalidateQueries({
                queryKey: ['user.getUser'],
              });
            }

            observer.next(result);
          },
          error: (err) => {
            observer.error(err);
          },
          complete: () => {
            observer.complete();
          },
        });

        return () => {
          subscription.unsubscribe();
        };
      });
    };
};
