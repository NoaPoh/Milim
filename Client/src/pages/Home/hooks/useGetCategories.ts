import { DisplayCategory } from 'milim-server/types';
import { api } from '../../../utils/trpcClient';
import defaultCategoriesIcons from '../../../constants/defaultCategoriesIcons';

export const useGetCategories = (enabled: boolean) => {
  const query = api.category.fetchUserCategories.useQuery(undefined, {
    enabled,
  });

  const categoriesWithDefaultPictures: DisplayCategory[] | undefined =
    query.data?.map((category) => {
      return {
        ...category,
        picture:
          // TODO: if pictures format will be PNG, replace the string here
          category.picture
            ? `data:image/png;base64,${category.picture}`
            : defaultCategoriesIcons[category.id],
      };
    });

  return {
    ...query,
    data: categoriesWithDefaultPictures,
  };
};
