import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'milim-server';
import { httpBatchLink } from '@trpc/client';
import { resetUserCacheAfterChange } from './invalidationLink';
import { QueryClient } from '@tanstack/react-query';

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = (queryClient: QueryClient) => {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: import.meta.env.VITE_API_URL,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include', // CRUCIAL for cookies
          });
        },
      }),
      resetUserCacheAfterChange(queryClient),
    ],
  });
}
