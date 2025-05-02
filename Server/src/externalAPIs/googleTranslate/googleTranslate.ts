import axios from 'axios';
import { GoogleTranslateResponse } from '../../types/dtos';

const googleAPIKey = process.env.GOOGLE_API_KEY;

export const translateWord = async (word: string): Promise<string> => {
  if (!googleAPIKey) {
    throw new Error(
      'Google API key is not defined in the environment variables.'
    );
  }

  const url = `https://translation.googleapis.com/language/translate/v2`;

  const requestConfig = {
    params: {
      q: word,
      source: 'en',
      target: 'he',
      format: 'text',
      key: googleAPIKey,
    },
  };

  try {
    const response = await axios.post<GoogleTranslateResponse>(
      url,
      null,
      requestConfig
    );

    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error translating word:', error);
    throw new Error('Translation failed');
  }
};
