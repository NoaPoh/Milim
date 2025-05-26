import { useState } from 'react';
import { useEndGamePopup } from './components/EndGamePopup/EndGamePopupContext';
import { api } from '../../utils/trpcClient'; // Adjust path as needed

type GameProps = {
  onComplete: (correct: boolean) => void;
};

type GenericGameProps = {
  GameComponent: React.ComponentType<GameProps>;
};

const GenericGame = ({ GameComponent }: GenericGameProps) => {
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const { showPopup } = useEndGamePopup();
  const winAGame = api.user.winAGame.useMutation();

  const handleComplete = (correct: boolean) => {
    console.log(`Round ${round + 1} completed. Correct: ${correct}`);

    if (correct) setCorrectCount((c) => c + 1);

    if (round < 4) {
      setRound((r) => r + 1);
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

  return (
    <>
      <GameComponent key={round} onComplete={handleComplete} />
    </>
  );
};

export default GenericGame;
