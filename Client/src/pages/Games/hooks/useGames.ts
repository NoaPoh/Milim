import { api } from '../../../utils/trpcClient';
import { games } from '../../../constants/games';
import { useEffect, useState } from 'react';

interface props {
  game: (typeof games)[number]['name'];
}

export const useGames = ({ game }: { game: string }) => {
  const amount = game === 'FlashCards' ? 5 : 10;
  const { data: words = [], isLoading } =
    api.word.fetchRandomUserWords.useQuery({
      amount,
    });

  return { words, isLoading };
};
