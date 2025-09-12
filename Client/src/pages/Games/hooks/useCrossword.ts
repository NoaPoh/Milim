import { useEffect, useState } from 'react';
import { Directions } from '../../../constants/directions';
import { generateRandomLetter } from '../Functions/functions';

export const useCrossword = (word: string, boardSize: number) => {
  const [displayDirection, setDisplayDirection] = useState<Directions>();
  const [displayedWord, setDisplayedWord] = useState<string>(word);
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
    setDisplayedWord(word);
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

    const maxStart = boardSize - displayedWord.length;

    // Place the word on the board based on the chosen direction
    switch (displayDirection) {
      case Directions.HORIZONTAL: {
        const row = Math.floor(Math.random() * boardSize);
        const startCol = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < displayedWord.length; i++) {
          letters[row][startCol + i] = displayedWord[i];
        }
        break;
      }

      case Directions.VERTICAL: {
        const col = Math.floor(Math.random() * boardSize);
        const startRow = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < displayedWord.length; i++) {
          letters[startRow + i][col] = displayedWord[i];
        }
        break;
      }

      case Directions.DIAGONAL: {
        const startRow = Math.floor(Math.random() * (maxStart + 1));
        const startCol = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < displayedWord.length; i++) {
          letters[startRow + i][startCol + i] = displayedWord[i];
        }
        break;
      }

      case Directions.REVERSE_DIAGONAL: {
        const startRow =
          Math.floor(Math.random() * (maxStart + 1)) + displayedWord.length - 1;
        const startCol = Math.floor(Math.random() * (maxStart + 1));
        for (let i = 0; i < displayedWord.length; i++) {
          letters[startRow - i][startCol + i] = displayedWord[i];
        }
        break;
      }

      default:
        break;
    }

    setBoardLetters(letters);
  }, [boardSize, displayedWord, displayDirection]);

  return {
    displayedWord,
    displayDirection,
    boardLetters,
  };
};
