import { TRPCClientError, TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import { AppRouter } from '../../../../Server/src/routers';

// like a middleware, but for the client
// this will redirect the user to the login page if they are not authenticated

export const handleUnauthorizedLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          if (err instanceof TRPCClientError && err.data?.httpStatus === 401) {
            window.location.href = '/login';
          }
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });

      return unsubscribe;
    });
  };
};
