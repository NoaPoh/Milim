export const generateRandomLetter = (): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export const generateButtonValues = (
  sheffledWord: string,
  buttonsAmount: number
): string[] => {
  const buttonsValues = Array(buttonsAmount).fill('');

  // Shuffle the indices of the buttons
  const shuffledIndices = [...Array(buttonsAmount).keys()].sort(
    () => Math.random() - 0.5
  );

  // Fill the buttons with letters from the shuffled word
  sheffledWord.split('').forEach((letter, index) => {
    buttonsValues[shuffledIndices[index]] = letter;
  });

  // Fill the remaining empty buttons with random letters
  for (let i = 0; i < buttonsValues.length; i++) {
    if (buttonsValues[i] === '') {
      buttonsValues[i] = generateRandomLetter();
    }
  }

  return buttonsValues;
};
