import SpellingBoard from './SpellingBoard';
import './Spelling.scss';
import { useState } from 'react';

type SpellingProps = {
  onComplete: (correct: boolean) => void;
  words: string;
  image: string;
};

const Spelling = ({ onComplete, words, image }: SpellingProps) => {
  const [success, setSuccess] = useState(false);
  //TODO: check if the given word is above 11 letters, if so, generate another word until it's ok

  return (
    <div className="container">
      <img src={image} alt={words} className="image" />
      <SpellingBoard word={words} setSuccess={setSuccess}></SpellingBoard>
      <button className="button" onClick={() => onComplete(success)}>
        next
      </button>
    </div>
  );
};

export default Spelling;
