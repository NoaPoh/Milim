import { api } from '../../utils/trpcClient';
import GlobalLoader from './GlobalLoader';
import {
  Mutation,
  Query,
  useIsFetching,
  useIsMutating,
} from '@tanstack/react-query';
import { getMutationKey, getQueryKey } from '@trpc/react-query';
import _ from 'lodash';

function GlobalLoaderInstigator() {
  const queriesToIgnore: (readonly string[])[] = [
    api.category.fetchCategoriesPictures,
    api.word.fetchWordsPictures,
  ].map((q) => getQueryKey(q)[0]);

  const mutationsToIgnore: (readonly string[])[] = [].map(
    (m) => getMutationKey(m)[0]
  );

  const queriesPredicate = (query: Query) => {
    return !queriesToIgnore.some((ignoreMe) =>
      _.isEqual(ignoreMe, query.queryKey[0])
    );
  };

  const mutationsPredicate = (mutation: Mutation) => {
    return !mutationsToIgnore.some((ignoreMe) =>
      _.isEqual(ignoreMe, mutation.options.mutationKey?.[0])
    );
  };

  const howManyFetching = useIsFetching({
    predicate: queriesPredicate,
  });
  const howManyMutating = useIsMutating({
    predicate: mutationsPredicate,
  });

  return <>{howManyFetching + howManyMutating > 0 && <GlobalLoader />}</>;
}

export default GlobalLoaderInstigator;
