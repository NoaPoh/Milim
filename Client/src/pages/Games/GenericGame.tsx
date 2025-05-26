import { useState } from 'react';
import { useSuccessPopup } from './components/SucessPopup/SuccessPopupContext';

type GameProps = {
  onComplete: (correct: boolean) => void;
};

type GenericGameProps = {
  GameComponent: React.ComponentType<GameProps>;
};

const GenericGame = ({ GameComponent }: GenericGameProps) => {
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const { showPopup } = useSuccessPopup();

  const handleComplete = (correct: boolean) => {
    console.log(`Round ${round + 1} completed. Correct: ${correct}`);

    if (correct) setCorrectCount((c) => c + 1);

    if (round < 4) {
      setRound((r) => r + 1);
    } else {
      setFinished(true);
      showPopup({
        earnedCoins: correctCount * 10,
        onPlayAgain: () => {
          //TODO: Refresh the screen
        },
      });
    }
  };

  return (
    <>
      {/* {!finished ? ( */}
      <GameComponent key={round} onComplete={handleComplete} />
      {/* ) : (
        <div>Game finished! Correct answers: {correctCount} / 5</div>
      )} */}
    </>
  );
};

export default GenericGame;
