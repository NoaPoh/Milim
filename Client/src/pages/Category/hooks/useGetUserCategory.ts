import {
  DisplayCategoryWithWords,
  WordWithStringPic,
} from 'milim-server/types';
import { api } from '../../../utils/trpcClient.ts';
import defaultCategoriesIcons from '../../../constants/defaultCategoriesIcons';
import { Category } from '@prisma/client';

export const useGetUserCategory = (categoryId: Category['id'] | undefined) => {
  const query = api.category.fetchUserCategoryById.useQuery(
    { id: categoryId! },
    { enabled: !!categoryId }
  );
  const category: DisplayCategoryWithWords | undefined = query.data
    ? {
        ...query.data,
        words: query.data.words.map((word: WordWithStringPic) => ({
          ...word,
          picture: resolveImagePath(word.picture, query.data.id),
        })),
        picture: resolveImagePath(query.data.picture, query.data.id),
      }
    : undefined;
  return {
    ...query,
    category,
  };
};

function resolveImagePath(picture: string, categoryId: Category['id']): string {
  return picture ?? defaultCategoriesIcons[categoryId];
}
