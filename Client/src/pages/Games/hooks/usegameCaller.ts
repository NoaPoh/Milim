import { useEffect, useState, useCallback } from 'react';
// import { generateButtonValues } from '../Functions/functions';
import { GameProps } from '../../../constants/games';

interface GameResult {
  correctCount: number;
  coins: number;
  isFinished: boolean;
  currentLevel: number;
  start: () => void;
  isRunning: boolean;
}

export const useGameCaller = (game: GameProps | null): GameResult => {
  const [correctCount, setCorrectCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(async () => {
    if (!game) return;

    setCorrectCount(0);
    setCurrentLevel(1);
    setIsFinished(false);
    setIsRunning(true);

    for (let i = 1; i <= 5; i++) {
      const result = await game.run();
      if (result.isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }
      setCurrentLevel(i + 1);
    }

    setIsFinished(true);
    setIsRunning(false);
  }, [game]);

  return {
    correctCount,
    coins: correctCount * 10,
    isFinished,
    currentLevel: currentLevel > 5 ? 5 : currentLevel,
    isRunning,
    start,
  };
};
