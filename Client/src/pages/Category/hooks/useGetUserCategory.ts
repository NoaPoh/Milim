import { WordWithStringPic } from 'milim-server/types';
import { api } from '../../../utils/trpcClient.ts';
import { Category } from '@prisma/client';

export const useGetUserCategory = (categoryId: Category['id'] | undefined) => {
  const categoryQuery = api.category.fetchCategoryById.useQuery(
    { id: categoryId! },
    { enabled: !!categoryId }
  );

  const picturesQuery = api.word.fetchWordsPictures.useQuery(
    categoryQuery.data?.words.map((word) => word.id) || [],
    {
      enabled: !!categoryQuery.data,
    }
  );

  const returnData = {
    ...categoryQuery.data,
    words: categoryQuery.data?.words.map((word) => {
      const picture = picturesQuery.isPending
        ? 'loading'
        : picturesQuery.data?.find((pic) => pic.id === word.id)?.picture || '';
      return { ...word, picture } as WordWithStringPic;
    }),
  };

  return {
    ...categoryQuery,
    data: returnData,
  };
};
