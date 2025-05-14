import { createContext, useContext, ReactNode } from 'react';
import { api } from '../utils/trpcClient';
import { UserDTO } from 'milim-server/types';

type UserContextValue = {
  user: Partial<UserDTO> | undefined;
  isLoading: boolean;
  error: unknown;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = api.user.getUser.useQuery();

  return (
    <UserContext.Provider value={{ user: data, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
