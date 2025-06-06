import { useEffect, useState } from 'react';
import { generateButtonValues } from '../Functions/functions';

export const useSpelling = (
  word: string,
  selectedLetters: string[],
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [buttonsAmount, setButtonsAmount] = useState<number>(0);
  const [shuffledWord, setSheffeledWord] = useState<string>('');
  const [buttonsValues, setButtonsValues] = useState<string[]>([]);

  // Set amount and shuffled word on mount
  useEffect(() => {
    const amount = getButtonsAmount(word);
    const shuffled = shuffleWordLetters(word);
    setButtonsAmount(amount);
    setSheffeledWord(shuffled);
  }, [word]);

  // Generate buttons only after both states are ready
  useEffect(() => {
    if (shuffledWord && buttonsAmount > 0) {
      setButtonsValues(generateButtonValues(shuffledWord, buttonsAmount));
    }
  }, [shuffledWord, buttonsAmount]);

  useEffect(() => {
    const typedWord = selectedLetters.join('');
    if (typedWord === word && setSuccess) {
      setSuccess(true);
    }
  }, [selectedLetters]);

  return { buttonsAmount, buttonsValues };
};

const getButtonsAmount = (word: string) => {
  const wordLength = word.length;
  if (wordLength < 7) return 8;
  if (wordLength < 9) return 10;
  return 12;
};

const shuffleWordLetters = (word: string) => {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join('');
};
