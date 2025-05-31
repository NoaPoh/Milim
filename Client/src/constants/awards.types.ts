import { AwardType } from '@prisma/client';

export const awardTypeLabels: Record<AwardType, string> = {
  BACKGROUND_COLOR: 'Habitat',
  PROFILE_ICON: 'Spirit Animal',
  ICON_BACKGROUND: 'Animal Background',
  ICON_FRAME: 'Frames',
};