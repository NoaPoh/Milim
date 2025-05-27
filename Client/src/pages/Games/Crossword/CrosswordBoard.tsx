import React, { useEffect, useState } from 'react';
import { useCrossword } from '../Hooks/useCrossword';
import './CrosswordBoard.scss';

interface Props {
  boardSize: number;
  word: string;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CrosswordBoard = ({ boardSize, word, setSuccess }: Props) => {
  const [clickedCells, setClickedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const { boardLetters } = useCrossword(word, boardSize);

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
          (_, i) => clickedCells[i]?.row === row && clickedCells[i]?.col === col
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
    }
  };

  useEffect(() => {
    const typed = selectedLetters.join('');

    if (word === typed) {
      setSuccess?.(true);
    }
  }, [selectedLetters, word]);

  return (
    <div className="crossword-container">
      <table>
        <tbody>
          {boardLetters.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((letter, colIndex) => (
                <td key={colIndex}>
                  <button
                    className={
                      isCellClicked(rowIndex, colIndex) ? 'selected' : ''
                    }
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

      <div className="letter-display">
        {Array.from({ length: word.length }).map((_, i) => (
          <div className="letter-slot" key={i}>
            <div className="letter">{selectedLetters[i] ?? ''}</div>
            <div className="underline" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrosswordBoard;
