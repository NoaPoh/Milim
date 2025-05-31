import { api } from '../../../utils/trpcClient';
import { GameNames, games } from '../../../constants/games';
import { useEffect } from 'react';

interface props {
  game: (typeof games)[number]['name'];
}

export const useGames = (props: props) => {
  const amount = props.game === GameNames.FLASH_CARDS ? 5 : 10;
  const { data: words = [], isLoading } =
    api.word.fetchRandomUserWords.useQuery({
      amount,
    });

  return { words, isLoading };
};
