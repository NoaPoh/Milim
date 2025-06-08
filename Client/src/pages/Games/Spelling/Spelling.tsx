import './Spelling.scss';
import SpellingBoard from './SpellingBoard';
import { useState } from 'react';

type SpellingProps = {
  onComplete: (correct: boolean) => void;
  words: string;
  image: string;
};

const Spelling = ({ onComplete, words, image }: SpellingProps) => {
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
    <div className="container">
      <img src={image} alt={words} className="image" />
      <SpellingBoard
        word={words}
        setSuccess={setSuccess}
        disabled={submitted}
      />

      {submitted && (
        <div className={`feedback ${success ? 'success' : 'error'}`}>
          {success ? 'כל הכבוד!' : `אופס... המילה הנכונה היא- ${words}`}
        </div>
      )}

      <button className="button" onClick={handleClick}>
        {submitted ? 'הבא' : 'זיהוי'}
      </button>
    </div>
  );
};

export default Spelling;
