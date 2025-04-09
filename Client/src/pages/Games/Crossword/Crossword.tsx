import React from 'react';
import CrosswordBoard from './CrosswordBoard';

const Crossword = () => {
  const word = 'hello';
  const boardSize = word.length + Math.floor(Math.random() * 3);

  return (
    <div>
      <CrosswordBoard boardSize={boardSize} word={word}></CrosswordBoard>
    </div>
  );
};

export default Crossword;
