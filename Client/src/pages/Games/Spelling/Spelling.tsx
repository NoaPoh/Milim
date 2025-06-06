import SpellingBoard from './SpellingBoard';
import './Spelling.scss';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type SpellingProps = {
  onComplete: (correct: boolean) => void;
  words: string;
  image: string;
};

const Spelling = ({ onComplete, words, image }: SpellingProps) => {
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    console.log(success);
    if (success) {
      toast.success('Great job! You spelled it correctly!');
    } else {
      toast.error(`Oops... The correct word was: ${words}`);
    }

    onComplete(success);
  };

  return (
    <div className="container">
      <img src={image} alt={words} className="image" />
      <SpellingBoard word={words} setSuccess={setSuccess}></SpellingBoard>
      <button className="button" onClick={handleNext}>
        next
      </button>
    </div>
  );
};

export default Spelling;
