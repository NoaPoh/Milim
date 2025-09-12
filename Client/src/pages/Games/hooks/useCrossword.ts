import { useEffect, useState } from 'react';
import { Directions } from '../../../constants/directions';
import { generateRandomLetter } from '../Functions/functions';

export const useCrossword = (word: string, boardSize: number) => {
  const [displayDirection, setDisplayDirection] = useState<Directions>();
  const [boardLetters, setBoardLetters] = useState<string[][]>([]);

  // Randomly choose the direction the word will be displayed
  const chooseRandomDirection = (): Directions => {
    const directionValues = Object.values(Directions).filter(
      (value) => typeof value === 'number'
    ) as Directions[];

    const randomIndex = Math.floor(Math.random() * directionValues.length);
    return directionValues[randomIndex] as Directions;
  };

  //Set the displayed word and the direction it will be displayed
  useEffect(() => {
    setDisplayDirection(chooseRandomDirection());
  }, []);

  useEffect(() => {
    const letters: string[][] = [];

    // Fill the board
    for (let row = 0; row < boardSize; row++) {
      const currentRow: string[] = [];
      for (let col = 0; col < boardSize; col++) {
        currentRow.push(generateRandomLetter());
      }
      letters.push(currentRow);
    }

    const maxStart = boardSize - word.length;

    // Place the word on the board based on the chosen direction
    switch (displayDirection) {
      case Directions.HORIZONTAL: {
        const row = Math.floor(Math.random() * boardSize);
        const startCol = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < word.length; i++) {
          letters[row][startCol + i] = word[i];
        }
        break;
      }

      case Directions.VERTICAL: {
        const col = Math.floor(Math.random() * boardSize);
        const startRow = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < word.length; i++) {
          letters[startRow + i][col] = word[i];
        }
        break;
      }

      case Directions.DIAGONAL: {
        const startRow = Math.floor(Math.random() * (maxStart + 1));
        const startCol = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < word.length; i++) {
          letters[startRow + i][startCol + i] = word[i];
        }
        break;
      }

      case Directions.REVERSE_DIAGONAL: {
        const startRow = Math.floor(Math.random() * (maxStart + 1));
        const startCol =
          Math.floor(Math.random() * (boardSize - word.length + 1)) +
          (word.length - 1);
        for (let i = 0; i < word.length; i++) {
          letters[startRow + i][startCol - i] = word[i];
        }
        break;
      }

      default:
        break;
    }

    setBoardLetters(letters);
  }, [boardSize, word, displayDirection]);

  return {
    displayDirection,
    boardLetters,
  };
};
