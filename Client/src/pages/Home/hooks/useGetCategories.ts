import { DisplayCategory } from 'milim-server/types';
import { api } from '../../../utils/trpcClient';
import defaultCategoriesIcons from '../../../constants/defaultCategoriesIcons';

export const useGetCategoriesList = (enabled: boolean, wordToAdd?: string) => {
  const categoriesQuery = api.category.fetchUserCategories.useQuery(
    { wordToAdd },
    {
      enabled,
    }
  );

  const picturesQuery = api.category.fetchCategoriesPictures.useQuery(
    {
      ids: categoriesQuery.data?.map((category) => category.id) || [],
    },
    {
      enabled: !!categoriesQuery.data,
    }
  );

  const categoriesWithDefaultPictures: DisplayCategory[] | undefined =
    categoriesQuery.data?.map((category) => {
      const picture = picturesQuery.isPending
        ? 'loading'
        : picturesQuery.data?.find((pic) => pic.id === category.id)?.picture ||
          defaultCategoriesIcons[category.id];

      return {
        ...category,
        picture,
      };
    });

  return {
    ...categoriesQuery,
    data: categoriesWithDefaultPictures,
  };
};
