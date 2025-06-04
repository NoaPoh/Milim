
// Get the latest award for each category based on the purchase date
import { PurchaseDTO } from 'milim-server/types';
import { AwardType } from '@prisma/client';

export function getActiveAwardsByCategory(purchases: PurchaseDTO[]): ActiveAwards {
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

export type ActiveAwards = Record<AwardType, string | undefined>;
