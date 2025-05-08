export interface GoogleTranslateResponse {
  data: {
    translations: Array<{
      translatedText: string;
      detectedSourceLanguage: string;
      model: string;
    }>;
  };
}

export type NormalizedVertices = {
  x: number; // 0–1
  y: number; // 0–1
};

export type GoogleAnnotation = {
  mid: string; // e.g. "/m/0bt9lr"
  score: number; // confidence, 0–1
  boundingPoly: {
    normalizedVertices: NormalizedVertices[];
  };
};

export type GoogleObjectAnnotation = GoogleAnnotation & {
  name: string; // e.g. "banana"
};

export type GoogleLabelAnnotation = GoogleAnnotation & {
  topicality: number; // main relevance, 0–1
  description: string; // e.g. "banana"
};

export type GoogleLabelDetectionResponse = {
  responses: Array<{
    labelAnnotations?: GoogleLabelAnnotation[];
  }>;
};

export type GoogleObjectDetectionResponse = {
  responses: Array<{
    localizedObjectAnnotations?: GoogleObjectAnnotation[];
  }>;
};
