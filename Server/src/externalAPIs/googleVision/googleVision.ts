import axios from 'axios';
import { GoogleLabelDetectionResponse } from '../../types/dtos';

const googleAPIKey = process.env.GOOGLE_API_KEY;

export async function detectLabelFromBase64(
  base64Image: string
): Promise<string> {
  if (!googleAPIKey) {
    throw new Error(
      'Google API key is not defined in the environment variables.'
    );
  }

  const url = `https://vision.googleapis.com/v1/images:annotate`;

  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 5,
          },
        ],
      },
    ],
  };

  const requestConfig = {
    params: {
      key: googleAPIKey,
    },
  };

  const response = await axios.post<GoogleLabelDetectionResponse>(
    url,
    requestBody,
    requestConfig
  );

  const labels = response.data.responses[0].labelAnnotations || [];

  if (labels.length === 0) {
    throw new Error('No labels found in the image.');
  }

  const bestLabel = labels.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  return bestLabel.description;
}
