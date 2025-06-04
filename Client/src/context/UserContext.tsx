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
    if (!data?.purchases) return undefined;

    const purchases: PurchaseDTO[] = data.purchases;
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

// once user is logged in, set the background color based on the user's active awards
function setUserBackgroundColor(backgroundColor?: string) {
  const resolvedBackground =
    backgroundColor === 'default' ? '#fbf3df' : backgroundColor ?? '';

  document.documentElement.style.setProperty(
    '--user-background',
    resolvedBackground
  );
}

// Get the latest award for each category based on the purchase date
function getActiveAwardsByCategory(purchases: PurchaseDTO[]): ActiveAwards {
  const latestAwardByType: ActiveAwards = {
    BACKGROUND_COLOR: undefined,
    PROFILE_ICON: undefined,
    ICON_BACKGROUND: undefined,
    ICON_FRAME: undefined,
  };

  if (purchases?.length) {
    const purchasesSortedByDateDesc = [...purchases].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    for (const type_ of Object.values(AwardType)) {
      const match = purchasesSortedByDateDesc.find(
        (p) => p.award.type === type_
      );
      if (match) {
        latestAwardByType[type_] = match.award.name;
      }
    }
  }

  return latestAwardByType;
}
