import { DisplayCategory } from 'milim-server/types';
import { api } from '../../../utils/trpcClient';
import defaultCategoriesIcons from '../../../constants/defaultCategoriesIcons';

export const useGetCategories = (enabled: boolean, wordToAdd?: string) => {
  const query = api.category.fetchUserCategories.useQuery(
    { wordToAdd },
    {
      enabled,
    }
  );

  const categoriesWithDefaultPictures: DisplayCategory[] | undefined =
    query.data?.map((category) => {
      return {
        ...category,
        picture: category.picture || defaultCategoriesIcons[category.id],
      };
    });

  return {
    ...query,
    data: categoriesWithDefaultPictures,
  };
};
