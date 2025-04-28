import axios from 'axios';
import { GoogleTranslateResponse } from '../../@types/dtos';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // put it in .env for safety

export const translateWord = async (word: string): Promise<string> => {
  const url = `https://translation.googleapis.com/language/translate/v2`;

  const response = await axios.post<GoogleTranslateResponse>(url, null, {
    params: {
      q: word,
      source: 'en',
      target: 'he',
      format: 'text',
      key: GOOGLE_API_KEY,
    },
  });

  const translatedText = response.data.data.translations[0].translatedText;
  return translatedText;
};
