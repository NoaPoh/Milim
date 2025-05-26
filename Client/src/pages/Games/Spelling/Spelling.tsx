import SpellingBoard from './SpellingBoard';
import './Spelling.scss';
import { useState } from 'react';

type SpellingProps = {
  onComplete: (correct: boolean) => void;
  word: string;
  image: string;
};

const Spelling = ({ onComplete, word, image }: SpellingProps) => {
  const [success, setSuccess] = useState(false);
  //TODO: check if the given word is above 11 letters, if so, generate another word until it's ok

  return (
    <div className="container">
      <img src={image} alt={word} className="image" />
      <SpellingBoard word={word} setSuccess={setSuccess}></SpellingBoard>
      <button className="button" onClick={() => onComplete(success)}>
        next
      </button>
    </div>
  );
};

export default Spelling;
