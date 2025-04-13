import { useEffect, useState } from 'react';
import { Directions } from '../consts/directions';

export const useCrossword = (
  word: string,
  boardSize: number,
  setBoardLetters: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const [displayDirection, setDisplayDirection] = useState<string>();
  const [displayedWord, setDisplayedWord] = useState<string>(word);

  const getRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  // Randomly choose the direction the word will be displayed
  const chooseRandomDirection = () => {
    const directionValues = Object.values(Directions);
    const randomIndex = Math.floor(Math.random() * directionValues.length);
    return directionValues[randomIndex] as Directions;
  };

  //Set the displayed word and the direction it will be displayed
  useEffect(() => {
    setDisplayDirection(chooseRandomDirection());

    // Randomly reverse the word or keep it as is
    setDisplayedWord(
      Math.random() < 0.5 ? word : word.split('').reverse().join('')
    );
  }, []);

  useEffect(() => {
    const letters: string[][] = [];

    // Fill the board
    for (let row = 0; row < boardSize; row++) {
      const currentRow: string[] = [];
      for (let col = 0; col < boardSize; col++) {
        currentRow.push(getRandomLetter());
      }
      letters.push(currentRow);
    }

    const maxStart = boardSize - displayedWord.length;

    // Place the word on the board based on the chosen direction
    if (displayDirection === Directions.HORIZONTAL) {
      const row = Math.floor(Math.random() * boardSize);
      const startCol = Math.floor(Math.random() * (maxStart + 1));

      for (let i = 0; i < displayedWord.length; i++) {
        letters[row][startCol + i] = displayedWord[i];
      }
    } else if (displayDirection === Directions.VERTICAL) {
      const col = Math.floor(Math.random() * boardSize);
      const startRow = Math.floor(Math.random() * (maxStart + 1));

      for (let i = 0; i < displayedWord.length; i++) {
        letters[startRow + i][col] = displayedWord[i];
      }
    } else if (displayDirection === Directions.DIAGONAL) {
      const startRow = Math.floor(Math.random() * (maxStart + 1));
      const startCol = Math.floor(Math.random() * (maxStart + 1));

      for (let i = 0; i < displayedWord.length; i++) {
        letters[startRow + i][startCol + i] = displayedWord[i];
      }
    } else if (displayDirection === Directions.REVERSE_DIAGONAL) {
      const startRow =
        Math.floor(Math.random() * (maxStart + 1)) + displayedWord.length - 1;
      const startCol = Math.floor(Math.random() * (maxStart + 1));

      for (let i = 0; i < displayedWord.length; i++) {
        letters[startRow - i][startCol + i] = displayedWord[i];
      }
    }

    setBoardLetters(letters);
  }, [boardSize, displayedWord, displayDirection]);

  return {
    displayedWord,
    displayDirection,
  };
};
