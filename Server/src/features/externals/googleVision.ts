import axios from 'axios';
import {
  GoogleObjectAnnotation,
  GoogleObjectDetectionResponse,
  NormalizedVertices,
} from '../../types/googleDtos';
import { TRPCError } from '@trpc/server';
import { dataURLToBase64 } from '../../utils/images.util';

const getBoxArea = (vertices: NormalizedVertices[]) => {
  if (vertices.length < 4) return 0;

  const width = Math.abs(vertices[1].x - vertices[0].x);
  const height = Math.abs(vertices[2].y - vertices[1].y);
  return width * height;
};

export async function detectObjectFromBase64(
  base64Image: string
): Promise<string> {
  if (process.env.DONT_USE_GOOGLE_API === 'true') {
    return 'test-object'; // For testing purposes, return a dummy object
  }

  const googleAPIKey = process.env.GOOGLE_API_KEY;

  if (!googleAPIKey) {
    throw new Error(
      'Google API key is not defined in the environment variables.'
    );
  }

  try {
    const url = `https://vision.googleapis.com/v1/images:annotate`;

    const strippedBase64 = dataURLToBase64(base64Image);

    const requestBody = {
      requests: [
        {
          image: {
            content: strippedBase64,
          },
          features: [
            {
              type: 'OBJECT_LOCALIZATION',
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

    const response = await axios.post<GoogleObjectDetectionResponse>(
      url,
      requestBody,
      requestConfig
    );

    const objects: GoogleObjectAnnotation[] =
      response.data.responses[0].localizedObjectAnnotations || [];

    if (objects.length === 0) {
      throw new TRPCError({
        message: 'No objects found in the image.',
        code: 'NOT_FOUND',
      });
    }

    const biggestObject = objects.reduce((prev, current) => {
      const prevArea = getBoxArea(prev.boundingPoly.normalizedVertices);
      const currentArea = getBoxArea(current.boundingPoly.normalizedVertices);

      return prevArea > currentArea ? prev : current;
    });

    const surestObject = objects.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );

    return biggestObject.name;
  } catch (error) {
    console.error('Error in detectObject:', error);
    throw new Error('Failed to detect object.');
  }
}
