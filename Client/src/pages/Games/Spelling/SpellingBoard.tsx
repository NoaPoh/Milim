import React, { useEffect, useState } from 'react';
import { useSpelling } from '../hooks/useSpelling';
import './Spelling.scss';
import { generateButtonValues } from '../Functions/functions';

interface SpellingBoardProps {
  word: string;
}

const SpellingBoard = ({ word }: SpellingBoardProps) => {
  const { buttonsAmount, sheffledWord } = useSpelling(word);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const buttonsValues = generateButtonValues(sheffledWord, buttonsAmount);

  const handleClick = (letter: string) => {
    if (selectedLetters.length < word.length) {
      setSelectedLetters((prev) => [...prev, letter]);
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
            className={`spelling-button ${
              buttonsAmount === 8 ? 'large' : 'small'
            }`}
            onClick={() => handleClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpellingBoard;
