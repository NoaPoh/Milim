import { api } from '../../../utils/trpcClient';
import { games } from '../../../constants/games';
import { useEffect, useState } from 'react';

interface props {
  game: (typeof games)[number]['name'];
}

export const useGames = ({ game }: props) => {
  const [amount, setAmount] = useState<number>(5);

  useEffect(() => {
    if (game === 'flashcards') setAmount(20);
  }, [game]);

  const { data: words } = api.word.fetchRandomUserWords.useQuery({
    amount,
  });

  return { words };
};
