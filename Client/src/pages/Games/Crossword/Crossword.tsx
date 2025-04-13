import React from 'react';
import CrosswordBoard from './CrosswordBoard';

const Crossword = () => {
  const word = 'hello';
  const boardLengthAddition = Math.floor(Math.random() * 3);
  const boardSize = word.length + boardLengthAddition;

  return (
    <div style={{ textAlign: 'center' }}>
      <CrosswordBoard boardSize={boardSize} word={word} />
    </div>
  );
};

export default Crossword;
