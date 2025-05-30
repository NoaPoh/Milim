import { api } from '../../../utils/trpcClient';
import { games } from '../../../constants/games';

interface props {
  game: (typeof games)[number]['name'];
}

export const useGames = (props: props) => {
  const amount = props.game === 'FlashCards' ? 5 : 10;
  const { data: words = [], isLoading } =
    api.word.fetchRandomUserWords.useQuery({
      amount,
    });

  return { words, isLoading };
};
