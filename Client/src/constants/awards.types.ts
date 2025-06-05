import { AwardType } from '@prisma/client';

export const awardTypeLabels: Record<AwardType, string> = {
  BACKGROUND_COLOR: 'רקעים',
  PROFILE_ICON: 'חיות',
  ICON_BACKGROUND: 'רקעי חיה',
  ICON_FRAME: 'מסגרות',
};

export type ActiveAwards = Record<AwardType, string | undefined>;

