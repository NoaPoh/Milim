import { useState } from 'react';
import { useSpelling } from '../hooks/useSpelling';
import './SpellingBoard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

interface SpellingBoardProps {
  word: string;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const SpellingBoard = ({ word, setSuccess, disabled }: SpellingBoardProps) => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [disabledIndexes, setDisabledIndexes] = useState<Set<number>>(
    new Set()
  );
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const { buttonsAmount, buttonsValues } = useSpelling(
    word,
    selectedLetters,
    setSuccess
  );

  const handleLetterClick = (letter: string, index: number) => {
    if (
      selectedLetters.length < word.length &&
      !disabledIndexes.has(index) &&
      !disabled
    ) {
      setSelectedLetters((prev) => [...prev, letter]);
      setSelectedIndexes((prev) => [...prev, index]);
      setDisabledIndexes((prev) => new Set(prev).add(index));
    }
  };

  const deleteLastLetter = () => {
    if (selectedLetters.length > 0 && selectedIndexes.length > 0) {
      const newSelectedLetters = selectedLetters.slice(0, -1);
      const newSelectedIndexes = selectedIndexes.slice(0, -1);
      const indexToEnable = selectedIndexes[selectedIndexes.length - 1];

      setSelectedLetters(newSelectedLetters);
      setSelectedIndexes(newSelectedIndexes);
      setDisabledIndexes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(indexToEnable);
        return newSet;
      });
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
      <div className="icon-button-wrapper">
        <button onClick={deleteLastLetter} hidden={disabled}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
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
            disabled={disabledIndexes.has(index) || disabled}
            className={`spelling-button ${
              buttonsAmount === 8 ? 'large' : 'small'
            } ${disabledIndexes.has(index) || disabled ? 'disabled' : ''}`}
            onClick={() => handleLetterClick(letter, index)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpellingBoard;
