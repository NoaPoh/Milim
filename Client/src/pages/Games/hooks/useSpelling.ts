import React, { useEffect } from 'react';

export const useSpelling = (word: string) => {
  const [buttonsAmount, setButtonsAmount] = React.useState<number>(0);
  const [sheffledWord, setSheffeledWord] = React.useState<string>('');

  const getButtonsAmount = () => {
    const wordLength = word.length;
    if (wordLength < 7) {
      return 8;
    } else if (wordLength < 9) {
      return 10;
    } else return 12;
  };

  const shuffleWordLetters = (word: string) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  useEffect(() => {
    setButtonsAmount(getButtonsAmount());
    setSheffeledWord(shuffleWordLetters(word));
  }, []);

  return { buttonsAmount, sheffledWord };
};
