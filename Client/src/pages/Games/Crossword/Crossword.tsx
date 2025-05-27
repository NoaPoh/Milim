import { useState } from 'react';
import CrosswordBoard from './CrosswordBoard';

type CrosswordProps = {
  onComplete: (correct: boolean) => void;
  words: string;
  image: string;
};

const Crossword = ({ onComplete, words, image }: CrosswordProps) => {
  const [success, setSuccess] = useState(false);
  const boardLengthAddition = Math.floor(Math.random() * 3);
  const boardSize = words.length + boardLengthAddition;

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={image} alt={words} className="image" />
      <CrosswordBoard
        boardSize={boardSize}
        word={words}
        setSuccess={setSuccess}
      />
      <button className="button" onClick={() => onComplete(success)}>
        next
      </button>
    </div>
  );
};

export default Crossword;
