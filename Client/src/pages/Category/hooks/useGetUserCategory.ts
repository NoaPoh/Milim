import { DisplayCategory } from 'milim-server/types';
import { trpc } from '../../../utils/trpc';
import defaultCategoriesIcons from '../../../constants/defaultCategoriesIcons';

export const useGetUserCategory = (categoryId: number) => {
  const query = trpc.category.fetchUserCategoryById.useQuery({ id: categoryId });
  const response = query.data;
  const category: DisplayCategory | undefined =
     response ? {
        ...response,
       words: response.words.map((word) => ({
          ...word,
          picture: formatImage(word.picture, response.id)
        })),
        picture:
          formatImage(response.picture, response.id)
      }: {};


  return {
    ...query,
    category,
  };
};

// TODO: if pictures format will be PNG, replace the string here

function formatImage(picture: string, categoryId?: string): string {
  return picture
    ? `data:image/jpeg;base64,${picture}`
    : defaultCategoriesIcons[categoryId];
}