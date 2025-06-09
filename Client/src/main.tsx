import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { api, trpcClient } from './utils/trpcClient';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App';
import './styles/globals.css';
import './index.css';
import { UserProvider } from './context/UserContext';
import { EndGamePopupProvider } from './pages/Games/components/EndGamePopup/EndGamePopupContext';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) => console.error(error),
  }),
});

// Wrap only if necessary (decide before rendering)
const AppWithAuth = () => {
  const location = useLocation();
  const isAuthPage = /^\/(login|register)$/.test(location.pathname);

  // Do not wrap the App component in UserProvider if we are on the login/register pages
  return isAuthPage ? (
    <App />
  ) : (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <api.Provider client={trpcClient(queryClient)} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <EndGamePopupProvider>
            <Toaster />
            <AppWithAuth />
          </EndGamePopupProvider>
        </QueryClientProvider>
      </api.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
