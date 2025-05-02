import axios from 'axios';
import {
  GoogleObjectAnnotation,
  GoogleObjectDetectionResponse,
  NormalizedVertices,
} from '../../types/googleDtos';

const googleAPIKey = process.env.GOOGLE_API_KEY;

const getBoxArea = (vertices: NormalizedVertices[]) => {
  if (vertices.length < 4) return 0;

  const width = Math.abs(vertices[1].x - vertices[0].x);
  const height = Math.abs(vertices[2].y - vertices[1].y);
  return width * height;
};

export async function detectObjectFromBase64(
  base64Image: string
): Promise<string> {
  if (!googleAPIKey) {
    throw new Error(
      'Google API key is not defined in the environment variables.'
    );
  }

  try {
    const url = `https://vision.googleapis.com/v1/images:annotate`;

    const strippedBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

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
      throw new Error('No objects found in the image.');
    }

    const sortedByArea = objects.sort(
      (a, b) =>
        getBoxArea(b.boundingPoly.normalizedVertices) -
        getBoxArea(a.boundingPoly.normalizedVertices)
    );
    const mostDominantObject = sortedByArea[0];

    const bestObject = objects.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );

    return mostDominantObject.name;
  } catch (error) {
    console.error('Error in detectObjectFromBase64:', error);
    throw new Error('Failed to detect object from base64 image.');
  }
}
