import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'milim-server';
import { httpBatchLink, TRPCClientError, TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';

export const api = createTRPCReact<AppRouter>();

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

export const trpcClient = api.createClient({
  links: [
    handleUnauthorizedLink,
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include', // CRUCIAL for cookies
        });
      },
    }),
  ],
});
