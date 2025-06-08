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
  const [submitted, setSubmitted] = useState(false);
  const [boardSize] = useState(
    () => words.length + Math.floor(Math.random() * 2)
  );

  const handleClick = () => {
    if (!submitted) {
      setSubmitted(true);
    } else {
      onComplete(success);
      setSubmitted(false);
      setSuccess(false);
    }
  };

  return (
    <div className="crossword-page">
      <img src={image} alt={words} className="image" />
      <CrosswordBoard
        boardSize={boardSize}
        word={words}
        setSuccess={setSuccess}
        disabled={submitted}
      />

      {submitted && (
        <div className={`feedback ${success ? 'success' : 'error'}`}>
          {success ? 'כל הכבוד!' : `אופס... המילה הנכונה היא- ${words}`}
        </div>
      )}

      <button className="crossword-page__button button" onClick={handleClick}>
        {submitted ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};

export default Crossword;
