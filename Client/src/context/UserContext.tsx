import { createContext, useContext, ReactNode, useMemo } from 'react';
import { api } from '../utils/trpcClient';
import { PurchaseDTO, UserDTO } from 'milim-server/types';
import { AwardType } from '@prisma/client';
import { ActiveAwards } from '../../../Server/src/utils/getActiveAwards.ts';

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

  const decoratedUser = useMemo(() => {
    if (!data?.purchases) return undefined;

    const activeAwards: ActiveAwards = data.activeAwards ;
    setUserBackgroundColor(activeAwards['BACKGROUND_COLOR'] || 'default');

    return {
      ...data,
      activeAwards,
    };
  }, [data]);

  return (
    <UserContext.Provider value={{ user: decoratedUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// once user is logged in, set the background color based on the user's active awards
function setUserBackgroundColor(backgroundColor?: string) {
  const resolvedBackground =
    backgroundColor === 'default' ? '#fbf3df' : backgroundColor ?? '';

  document.documentElement.style.setProperty(
    '--user-background',
    resolvedBackground
  );
}
