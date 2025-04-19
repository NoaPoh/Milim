import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'milim-server';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
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
  ],
});
