import { useState } from 'react';
import CrosswordBoard from './CrosswordBoard';
import './Crossword.scss';

type CrosswordProps = {
  onComplete: (correct: boolean) => void;
  words: string;
  image: string;
};

const Crossword = ({ onComplete, words, image }: CrosswordProps) => {
  const [success, setSuccess] = useState(false);
  const [boardSize] = useState(
    () => words.length + Math.floor(Math.random() * 2)
  );

  return (
    <div className="crossword-page">
      <img src={image} alt={words} className="image" />
      <CrosswordBoard
        boardSize={boardSize}
        word={words}
        setSuccess={setSuccess}
      />
      <button
        className="crossword-page__button button"
        onClick={() => onComplete(success)}
      >
        next
      </button>
    </div>
  );
};

export default Crossword;
