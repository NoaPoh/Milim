import { useMemo, useState } from 'react';
import CrosswordBoard from './CrosswordBoard';
import './Crossword.scss';

type CrosswordProps = {
  onComplete: (correct: boolean) => void;
  words: string;
  image: string;
};

const Crossword = ({ onComplete, words: word, image }: CrosswordProps) => {
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      <img src={image} alt={word} className="image" />
      <CrosswordBoard
        boardSize={word.length}
        word={word}
        setSuccess={setSuccess}
        disabled={submitted}
      />

      {submitted && (
        <div className={`feedback ${success ? 'success' : 'error'}`}>
          {success ? 'כל הכבוד!' : `אופס... המילה הנכונה היא- ${word}`}
        </div>
      )}

      <button className="crossword-page__button button" onClick={handleClick}>
        {submitted ? 'הבא' : 'זיהוי'}
      </button>
    </div>
  );
};

export default Crossword;
