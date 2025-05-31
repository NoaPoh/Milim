import { createContext, useContext, ReactNode, useMemo } from 'react';
import { api } from '../utils/trpcClient';
import { PurchaseDTO, UserDTO } from 'milim-server/types';
import { AwardType } from '@prisma/client';

type UserContextValue = {
  user: Partial<UserDTO> | undefined;
  isLoading: boolean;
  error: unknown;
};
export type ActiveAwards = Record<AwardType, string | undefined>;

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
    if (!data) return undefined;

    const purchases: PurchaseDTO = data.purchases;
    const activeAwards: ActiveAwards = getActiveAwardsByCategory(purchases);
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

function setUserBackgroundColor(backgroundColor?: string) {
  const resolvedBackground = backgroundColor === 'default' ? '#fbf3df' : backgroundColor ?? '';

  document.documentElement.style.setProperty('--user-background', resolvedBackground);
}

function getActiveAwardsByCategory(purchases: PurchaseDTO[]): ActiveAwards {
  const latestAwardByType: Record<AwardType, string> = {};

  if (purchases?.length) {
    const sortedPurchasesByDate = [...purchases].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    for (const category of Object.values(AwardType)) {
      const match = sortedPurchasesByDate.find(p => p.award.category === category);
      if (match) {
        latestAwardByType[category] = match.award.name;
      }
    }
  }

  return latestAwardByType;
}