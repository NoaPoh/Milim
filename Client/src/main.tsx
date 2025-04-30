import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { trpc, trpcClient } from './utils/trpc';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App';
import './styles/globals.css';
import './index.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error(error),
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </trpc.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
