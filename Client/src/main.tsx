import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { trpc, trpcClient } from './utils/trpc/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/globals.css';
import './index.css';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient();
const client = trpcClient(queryClient); // Initialize the trpc client with the query client

// Wrap only if necessary (decide before rendering)
const AppWithAuth = () => {
  const location = useLocation();
  const isAuthPage = /^\/(login|register)$/.test(location.pathname);

  // Do not wrap the App component in UserProvider if we are on the login/register pages
  return isAuthPage ? <App /> : (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <trpc.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AppWithAuth />
        </QueryClientProvider>
      </trpc.Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
