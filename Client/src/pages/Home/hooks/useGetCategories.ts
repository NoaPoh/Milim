import { DisplayCategory } from 'milim-server/types';
import { trpc } from '../../../utils/trpc';
import defaultCategoriesIcons from '../../../constants/defaultCategoriesIcons';

export const useGetCategories = () => {
  const query = trpc.category.fetchUserCategories.useQuery();

  const categoriesWithDefaultPictures: DisplayCategory[] | undefined =
    query.data?.map((category) => {
      return {
        ...category,
        picture:
          // TODO: if pictures format will be PNG, replace the string here
          category.picture
            ? `data:image/jpeg;base64,${category.picture}`
            : defaultCategoriesIcons[category.id],
      };
    });

  console.log('categoriesWithDefaultPictures', categoriesWithDefaultPictures);

  return {
    ...query,
    data: categoriesWithDefaultPictures,
  };
};
