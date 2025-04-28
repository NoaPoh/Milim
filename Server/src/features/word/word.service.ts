import { translateWord as googleTranslate } from '../../externalAPIs/googleTranslate/googleTranslate';

export const translateWord = async (word: string): Promise<string> => {
  return await googleTranslate(word);
};
