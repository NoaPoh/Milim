import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'milim-server';
import { httpBatchLink } from '@trpc/client';
import { resetUserCacheAfterChange } from './trpc/invalidationLink';
import { QueryClient } from '@tanstack/react-query';
import { handleUnauthorizedLink } from './trpc/handleUnauthorizedLink';

export const api = createTRPCReact<AppRouter>();

export const trpcClient = (queryClient: QueryClient) =>
  api.createClient({
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
      resetUserCacheAfterChange(queryClient),
    ],
  });
