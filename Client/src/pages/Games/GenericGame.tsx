import { useState } from 'react';
import { useEndGamePopup } from './components/EndGamePopup/EndGamePopupContext';
import { api } from '../../utils/trpcClient';
import { useGames } from './hooks/useGames';
import { GameNames } from '../../constants/games';
type GameProps = {
  onComplete: (correct: boolean) => void;
  words: string | string[];
  image: string;
};

type FlashCardsProps = {
  onNextRound: (correct: boolean) => void;
  roundWords: any[];
  correctId: number;
};

type GenericGameProps = {
  GameComponent: React.ComponentType<GameProps | FlashCardsProps>;
};

const GenericGame = ({ GameComponent }: GenericGameProps) => {
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const { showPopup } = useEndGamePopup();
  const winAGame = api.user.winAGame.useMutation();

  const { words, isLoading } = useGames({ game: GameComponent.name });

  const handleCompleteRound = (correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);

    if (round < words.length - 1) {
      setRound((r) => r + 1);
    } else {
      const earnedCoins = (correct ? correctCount + 1 : correctCount) * 10;
      winAGame.mutate({ coins: earnedCoins });
      showPopup({
        earnedCoins,
        onPlayAgain: () => {
          setRound(0);
          setCorrectCount(0);
        },
      });
    }
  };

  if (isLoading) return <div>טוען...</div>;

  if (GameComponent.name === GameNames.FLASH_CARDS) {
    const correct = words[round];
    const others = words.filter((w) => w.id !== correct.id);
    const distractors = others.slice(0, 3);

    const roundWords = [...distractors, correct].sort(
      () => 0.5 - Math.random()
    );

    return (
      <GameComponent
        key={round}
        roundWords={roundWords}
        correctId={correct.id}
        onNextRound={handleCompleteRound}
      />
    );
  }

  const currentWord = words[round];
  return (
    <GameComponent
      key={round}
      onComplete={handleCompleteRound}
      words={currentWord.originalText.toLowerCase()}
      image={currentWord.picture}
    />
  );
};

export default GenericGame;
