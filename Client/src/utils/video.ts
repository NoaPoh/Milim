export const convertVideoToBase64 = (
  video: HTMLVideoElement | null
): string | null => {
  const context = videoToContext(video);
  if (!context) return null;

  return context.canvas.toDataURL('image/png');
};

export const convertVideoToData = (
  video: HTMLVideoElement | null
): ImageData | null => {
  const context = videoToContext(video);
  if (!context) return null;

  return context.getImageData(
    0,
    0,
    context.canvas.width,
    context.canvas.height
  );
};

const videoToContext = (
  video: HTMLVideoElement | null
): CanvasRenderingContext2D | null => {
  if (!isVideoReady(video)) return null;

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  return context;
};

export const isVideoReady = (
  video: HTMLVideoElement | null
): video is HTMLVideoElement => {
  return video !== null && video.videoWidth > 0 && video.videoHeight > 0;
};

export type VideoDimensions = {
  width: number;
  height: number;
};

export const extractVideoDimensions = (
  video: HTMLVideoElement | null
): VideoDimensions | null => {
  if (!isVideoReady(video)) return null;

  return {
    width: video.videoWidth,
    height: video.videoHeight,
  };
};
