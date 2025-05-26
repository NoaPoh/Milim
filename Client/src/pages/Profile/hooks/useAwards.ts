import { api } from '../../../utils/trpcClient';

export const useAwards = () =>
  api.award.getAll.useQuery();
