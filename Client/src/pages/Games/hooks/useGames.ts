import { api } from '../../../utils/trpcClient';
import { GameNames, games } from '../../../constants/games';

interface props {
  game: (typeof games)[number]['name'];
}

export const useGames = ({ game }: props) => {
  const { data: words = [], isLoading } =
    api.word.fetchRandomUserWords.useQuery({
      amount: 5,
      noSpaceLimitation: (game === GameNames.CROSSWORD ||
        game === GameNames.SPELLING)!!,
      charsLimitation:
        game === GameNames.CROSSWORD
          ? 6
          : game === GameNames.SPELLING
          ? 10
          : undefined,
    });

  return { words, isLoading };
};
