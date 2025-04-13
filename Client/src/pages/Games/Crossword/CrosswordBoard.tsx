import React, { useState, useEffect } from 'react';
import { useCrossword } from '../../../hooks/useCrossword';

interface Props {
  boardSize: number;
  word: string;
  boardLengthAddition: number;
}

const CrosswordBoard = ({ boardSize, word, boardLengthAddition }: Props) => {
  const { displayeWord, displayDirection } = useCrossword(word);
  const [clickedCells, setClickedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [boardLetters, setBoardLetters] = useState<string[][]>([]);

  const getRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  console.log(displayDirection, displayeWord);

  useEffect(() => {
    const letters: string[][] = [];
    let wordIndex = 0;

    for (let row = 0; row < boardSize; row++) {
      const currentRow: string[] = [];
      for (let col = 0; col < boardSize; col++) {
        if (wordIndex < word.length) {
          currentRow.push(word[wordIndex]);
          wordIndex++;
        } else {
          currentRow.push(getRandomLetter());
        }
      }
      letters.push(currentRow);
    }

    setBoardLetters(letters);
  }, [boardSize, word]);

  const isClicked = (row: number, col: number) => {
    return clickedCells.some((cell) => cell.row === row && cell.col === col);
  };

  const handleCellClick = (row: number, col: number, letter: string) => {
    setClickedCells((prev) => [...prev, { row, col }]);
    console.log(letter);
  };

  return (
    <table
      style={{
        borderCollapse: 'collapse',
        margin: '20px auto',
      }}
    >
      <tbody>
        {boardLetters.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((letter, colIndex) => (
              <td
                key={colIndex}
                style={{
                  width: '50px',
                  height: '50px',
                  border: '3px solid black',
                  textAlign: 'center',
                  fontSize: '24px',
                  padding: 0,
                }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: isClicked(rowIndex, colIndex)
                      ? '#add8e6'
                      : 'white',
                  }}
                  onClick={() => handleCellClick(rowIndex, colIndex, letter)}
                >
                  {letter}
                </button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CrosswordBoard;
