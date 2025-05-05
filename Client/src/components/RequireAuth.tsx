import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../utils/trpc';
import React from 'react';

export const NO_USER_ID = -1;
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = trpc.auth.getMe.useQuery();

  useEffect(() => {
    if (user?.userId === NO_USER_ID) {
      console.log('No user found, redirecting to login...');

      navigate('/login');
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};
