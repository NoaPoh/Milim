import { DisplayCategory } from 'milim-server/types';
import { api } from '../../../utils/trpcClient';
import { resolveImagePath } from '../../../constants/defaultCategoriesIcons';

export const useGetCategories = (enabled: boolean) => {
  const query = api.category.fetchUserCategories.useQuery(undefined, {
    enabled,
  });

  const categoriesWithDefaultPictures: DisplayCategory[] | undefined =
    query.data?.map((category) => ({
      ...category,
      picture: resolveImagePath(category.picture, category.id),
    }));

  return {
    ...query,
    data: categoriesWithDefaultPictures,
  };
};
