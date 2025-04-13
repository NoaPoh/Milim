import { useEffect, useState } from 'react';
import { Directions } from '../consts/directions';

export const useCrossword = (word: string) => {
  const [displayDirection, setDisplayDirection] = useState<string>();

  // Randomly reverse the word or keep it as is
  const displayeWord =
    Math.random() < 0.5 ? word : word.split('').reverse().join('');

  // Randomly choose the direction the word will be displayed
  const chooseRandomDirection = () => {
    const directionValues = Object.values(Directions);
    const randomIndex = Math.floor(Math.random() * directionValues.length);
    return directionValues[randomIndex] as Directions;
  };

  useEffect(() => {
    setDisplayDirection(chooseRandomDirection());
  });

  return {
    displayeWord,
    displayDirection,
  };
};
