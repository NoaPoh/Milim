import { useState } from 'react';
import { useSuccessPopup } from './components/SucessPopup/SuccessPopupContext';
import { api } from '../../utils/trpcClient';
import { useGames } from './hooks/useGames';

type GameProps = {
  onComplete: (correct: boolean) => void;
  words: string | string[];
  image: string;
};

type GenericGameProps = {
  GameComponent: React.ComponentType<GameProps>;
};

const GenericGame = ({ GameComponent }: GenericGameProps) => {
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const { showPopup } = useSuccessPopup();
  const winAGame = api.user.winAGame.useMutation();

  const { words } = useGames({ game: GameComponent.name });
  console.log('words', words);

  const handleCompleteRound = (correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);

    if (round < 4) {
      setRound((round) => round + 1);
    } else {
      const earnedCoins = correct ? (correctCount + 1) * 10 : correctCount * 10;
      winAGame.mutate({
        coins: earnedCoins,
      });
      showPopup({
        earnedCoins: earnedCoins,
        onPlayAgain: () => {
          setRound(0);
          setCorrectCount(0);
        },
      });
    }
  };

  if (!words || words.length <= round) {
    return <div>Loading...</div>;
  }
  const currentWord = words[round];

  return (
    <>
      <GameComponent
        key={round}
        onComplete={handleCompleteRound}
        words={currentWord.originalText.toLowerCase()}
        image={currentWord.picture}
      />
    </>
  );
};

export default GenericGame;
