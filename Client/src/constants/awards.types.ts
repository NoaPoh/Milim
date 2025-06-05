export enum AwardType {
  BACKGROUND_COLOR = 'BACKGROUND_COLOR',
  PROFILE_ICON = 'PROFILE_ICON',
  ICON_BACKGROUND = 'ICON_BACKGROUND',
  ICON_FRAME = 'ICON_FRAME',
}

export const awardTypeLabels: Record<AwardType, string> = {
  BACKGROUND_COLOR: 'רקעים',
  PROFILE_ICON: 'חיות',
  ICON_BACKGROUND: 'רקעי חיה',
  ICON_FRAME: 'מסגרות',
};

export type ActiveAwards = Record<AwardType, string | undefined>;
