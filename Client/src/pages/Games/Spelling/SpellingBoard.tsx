import React, { useState } from 'react';
import { useSpelling } from '../hooks/useSpelling';
import './Spelling.scss';

interface SpellingBoardProps {
  word: string;
}

const SpellingBoard = ({ word }: SpellingBoardProps) => {
  const { buttonsAmount, buttonsValues } = useSpelling(word);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [disabledIndexes, setDisabledIndexes] = useState<Set<number>>(
    new Set()
  );

  const handleClick = (letter: string, index: number) => {
    if (selectedLetters.length < word.length && !disabledIndexes.has(index)) {
      setSelectedLetters((prev) => [...prev, letter]);
      setDisabledIndexes((prev) => new Set(prev).add(index));
    }
  };

  return (
    <div className="spelling-container">
      <div className="spelling-lines">
        {Array.from({ length: word.length }).map((_, i) => (
          <div key={i} className="spelling-letter-container">
            <div className="spelling-letter">{selectedLetters[i] ?? ''}</div>
            <div className="spelling-line" />
          </div>
        ))}
      </div>

      <div
        className={`spelling-board ${buttonsAmount === 8 ? 'large' : 'small'}`}
        style={{
          gridTemplateColumns: `repeat(${buttonsAmount / 2}, ${
            buttonsAmount === 8 ? '60px' : '50px'
          })`,
        }}
      >
        {buttonsValues.map((letter, index) => (
          <button
            key={index}
            disabled={disabledIndexes.has(index)}
            className={`spelling-button ${
              buttonsAmount === 8 ? 'large' : 'small'
            } ${disabledIndexes.has(index) ? 'disabled' : ''}`}
            onClick={() => handleClick(letter, index)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpellingBoard;
