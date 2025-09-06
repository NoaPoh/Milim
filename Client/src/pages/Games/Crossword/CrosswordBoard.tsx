import React, { useEffect, useState } from 'react';
import { useCrossword } from '../hooks/useCrossword';
import './CrosswordBoard.scss';

interface Props {
  boardSize: number;
  word: string;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const CrosswordBoard = ({ boardSize, word, setSuccess, disabled }: Props) => {
  const [clickedCells, setClickedCells] = useState<
    { row: number; col: number }[]
  >([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const { boardLetters } = useCrossword(word, boardSize);

  const isCellClicked = (row: number, col: number) => {
    return clickedCells.some((cell) => cell.row === row && cell.col === col);
  };

  const handleCellClick = (row: number, col: number, letter: string) => {
    if (disabled) return;

    const cell = { row, col };
    const alreadyClickedIndex = clickedCells.findIndex(
      (c) => c.row === row && c.col === col
    );

    // 🔄 If cell is already selected → deselect it
    if (alreadyClickedIndex !== -1) {
      setClickedCells((prev) =>
        prev.filter((_, i) => i !== alreadyClickedIndex)
      );
      setSelectedLetters((prev) =>
        prev.filter((_, i) => i !== alreadyClickedIndex)
      );
      return;
    }

    const nextIndex = selectedLetters.length;

    // First letter: free choice
    if (nextIndex === 0) {
      setClickedCells([cell]);
      setSelectedLetters([letter]);
      return;
    }

    const prevCell = clickedCells[clickedCells.length - 1];

    // Second letter: determines direction (including diagonals)
    if (nextIndex === 1) {
      const rowDiff = row - prevCell.row;
      const colDiff = col - prevCell.col;

      // must be adjacent (horizontal, vertical, or diagonal)
      if (Math.abs(rowDiff) > 1 || Math.abs(colDiff) > 1) return;

      setClickedCells((prev) => [...prev, cell]);
      setSelectedLetters((prev) => [...prev, letter]);
      return;
    }

    // From third letter onward: must follow the same direction
    const firstCell = clickedCells[0];
    const secondCell = clickedCells[1];
    const dirRow = secondCell.row - firstCell.row;
    const dirCol = secondCell.col - firstCell.col;

    const expectedRow = prevCell.row + dirRow;
    const expectedCol = prevCell.col + dirCol;

    if (row === expectedRow && col === expectedCol) {
      setClickedCells((prev) => [...prev, cell]);
      setSelectedLetters((prev) => [...prev, letter]);
    }
  };

  useEffect(() => {
    const typed = selectedLetters.join('');

    if (word === typed) {
      setSuccess?.(true);
    }
  }, [selectedLetters]);

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
                    disabled={disabled}
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
