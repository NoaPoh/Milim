// context/UserContext.tsx

import {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { trpc } from '../utils/trpc/trpc';

type UserContextValue = {
  user: ReturnType<typeof trpc.user.getUser.useQuery>['data'];
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
  const { data, isLoading, error } = trpc.user.getUser.useQuery();

  return (<UserContext.Provider value={{ user: data, isLoading, error }}>
  {children}
  </UserContext.Provider>);
};
