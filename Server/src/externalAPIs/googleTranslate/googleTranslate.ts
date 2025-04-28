import axios from 'axios';
import { GoogleTranslateResponse } from '../../@types/dtos';

const googleAPIKey = process.env.GOOGLE_API_KEY;

export const translateWord = async (word: string): Promise<string> => {
  const url = `https://translation.googleapis.com/language/translate/v2`;

  const response = await axios.post<GoogleTranslateResponse>(url, null, {
    params: {
      q: word,
      source: 'en',
      target: 'he',
      format: 'text',
      key: googleAPIKey,
    },
  });

  const translatedText = response.data.data.translations[0].translatedText;
  return translatedText;
};
