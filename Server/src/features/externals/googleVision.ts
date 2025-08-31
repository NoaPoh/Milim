import axios from 'axios';
import {
  GoogleObjectAnnotation,
  GoogleObjectDetectionResponse,
  NormalizedVertices,
} from '../../types/googleDtos';
import { TRPCError } from '@trpc/server';
import { dataURLToBase64 } from '../../utils/images.util';

const getBoxArea = (vertices: NormalizedVertices[]): number => {
  if (vertices.length < 4) return 0;

  const width = Math.abs(vertices[1].x - vertices[0].x);
  const height = Math.abs(vertices[2].y - vertices[1].y);
  return width * height;
};

const getBoxCenterDistance = (vertices: NormalizedVertices[]): number => {
  if (vertices.length < 4) return 0;

  const centerX =
    (vertices[0].x + vertices[1].x + vertices[2].x + vertices[3].x) / 4;
  const centerY =
    (vertices[0].y + vertices[1].y + vertices[2].y + vertices[3].y) / 4;

  const centerDistance = Math.sqrt(
    Math.pow(centerX - 0.5, 2) + Math.pow(centerY - 0.5, 2)
  ); // 0 (centered) to ~0.71 (corner)

  return centerDistance;
};

function getObjectScore(object: GoogleObjectAnnotation): number {
  const centerWeight = 0.5;
  const areaWeight = 0.3;
  const confidenceWeight = 0.2;

  const vertices: NormalizedVertices[] = object.boundingPoly.normalizedVertices;
  if (vertices.length < 4) return 0;

  const centerDistance = getBoxCenterDistance(vertices); // 0–0.71

  const area = getBoxArea(vertices); // 0–1

  const score =
    (1 - centerDistance) * centerWeight +
    area * areaWeight +
    object.score * confidenceWeight;

  return score;
}

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
        message: 'אין חפצים מזוהים בתמונה.',
        code: 'NOT_FOUND',
      });
    }

    const bestObject = objects.reduce((prev, current) =>
      getObjectScore(current) > getObjectScore(prev) ? current : prev
    );

    return bestObject.name;
  } catch (error) {
    console.error('Error in detectObject:', error);
    throw new Error('לא הצלחנו לזהות חפצים בתמונה.');
  }
}
