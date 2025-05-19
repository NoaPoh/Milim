import { DisplayCategoryWithWords } from 'milim-server/types';
import { api } from '../../../utils/trpcClient.ts';
import { resolveImagePath } from '../../../constants/defaultCategoriesIcons';
import { Category } from '@prisma/client';

export const useGetUserCategory = (categoryId: Category['id'] | undefined) => {
  const query = api.category.fetchUserCategoryById.useQuery(
    { id: categoryId! },
    { enabled: !!categoryId }
  );
  const category: DisplayCategoryWithWords | undefined = query.data
    ? {
        ...query.data,
        words: query.data.words.map((word) => ({
          ...word,
          discoveredAt: new Date(word.discoveredAt?.toString()),
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
