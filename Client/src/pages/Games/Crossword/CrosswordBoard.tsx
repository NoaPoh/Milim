import React, { useState } from 'react';
import { useCrossword } from '../../../hooks/useCrossword';

interface Props {
  boardSize: number;
  word: string;
}

//TODO: After clicking on word.length letters, it will toast a fail/success message
//TODO: When clicking on an already selected cell again it will uncolour it
//TODO: Remove styles to a css file, improve the styles
const CrosswordBoard = ({ boardSize, word }: Props) => {
  const [boardLetters, setBoardLetters] = useState<string[][]>([]);
  const [clickedCells, setClickedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const {} = useCrossword(word, boardSize, setBoardLetters);

  const isCellClicked = (row: number, col: number) => {
    return clickedCells.some((cell) => cell.row === row && cell.col === col);
  };

  const handleCellClick = (row: number, col: number, letter: string) => {
    const alreadyClicked = clickedCells.some(
      (cell) => cell.row === row && cell.col === col
    );

    if (alreadyClicked) {
      setClickedCells((prev) =>
        prev.filter((cell) => cell.row !== row || cell.col !== col)
      );
      setSelectedLetters((prev) => {
        const index = prev.findIndex(
          (l, i) => clickedCells[i]?.row === row && clickedCells[i]?.col === col
        );
        if (index !== -1) {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        }
        return prev;
      });
    } else {
      if (selectedLetters.length >= word.length) return;
      setClickedCells((prev) => [...prev, { row, col }]);
      setSelectedLetters((prev) => [...prev, letter]);
      console.log(letter);
    }
  };

  return (
    <div>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '50px 30px 0px 30px',
          direction: 'ltr',
        }}
      >
        {Array.from({ length: word.length }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                marginBottom: '8px',
                minHeight: '35px',
              }}
            >
              {selectedLetters[i] ?? ''}
            </div>
            <div
              style={{
                height: '2px',
                backgroundColor: 'black',
                width: '50px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrosswordBoard;
