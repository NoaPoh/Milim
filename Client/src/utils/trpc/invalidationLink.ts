import { QueryClient } from '@tanstack/react-query';
import { observable } from '@trpc/server/observable';

// this is a trpc middleware, which intercepts transaction
// to invalidate user cache after any change in entity
export const resetUserCacheAfterChange = (queryClient: QueryClient) => {
  return () => ({ op, next }) => {
    return observable(observer => {
      const subscription = next(op).subscribe({
        next: async (result) => {
          if (op.path.startsWith('user.') && result.result?.type === 'data') {
              await queryClient.invalidateQueries({ queryKey: ['user.getUser'] });
          }

          observer.next(result);
        },
        error: (err) => {
          observer.error(err);
        },
        complete: () => { observer.complete() },
      });

      return () => { subscription.unsubscribe();};
    });
  };
};
