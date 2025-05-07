import React from 'react';
import SpellingBoard from './SpellingBoard';

const Spelling = () => {
  //TODO: check if the given word is above 11 letters, if so, generate another word until it's ok
  const word = 'hello';

  return (
    <div>
      <SpellingBoard word={word}></SpellingBoard>
    </div>
  );
};

export default Spelling;
