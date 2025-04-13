import React, { useState, useEffect } from 'react';
import { useCrossword } from '../../../hooks/useCrossword';
import { Directions } from '../../../consts/directions';

interface Props {
  boardSize: number;
  word: string;
}

//TODO: When clicking on an already selected cell again it will uncolour it
const CrosswordBoard = ({ boardSize, word }: Props) => {
  const [boardLetters, setBoardLetters] = useState<string[][]>([]);
  const [clickedCells, setClickedCells] = useState<
    { row: number; col: number }[]
  >([]);

  const { displayDirection } = useCrossword(word, boardSize, setBoardLetters);

  const isCellClicked = (row: number, col: number) => {
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
                    backgroundColor: isCellClicked(rowIndex, colIndex)
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
