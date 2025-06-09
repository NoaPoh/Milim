import { useRef, useState } from 'react';
import { convertVideoToBase64 } from '../../../utils/video';

export enum CameraFacingMode {
  FRONT = 'user',
  BACK = 'environment',
}

function useCameraFeedControl() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [stalePhoto, setStalePhoto] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cantUseCamera, setCantUseCamera] = useState<boolean>(false);

  const captureFrameAsBase64 = (): string | null => {
    return convertVideoToBase64(videoRef.current);
  };

  const getCameraStream = async (): Promise<MediaStream> => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: CameraFacingMode.BACK } }, // request back camera
      });
    } catch (error: any) {
      if (error.name === 'OverconstrainedError') {
        return await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: CameraFacingMode.FRONT } }, // fallback to front camera
        });
      }
      console.error('Error accessing camera:', error);
      throw error;
    }
  };

  const startFeed = async (onStart?: () => void) => {
    try {
      const stream = await getCameraStream();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      onStart?.();
    } catch (error: any) {
      setCantUseCamera(true);

      if (error.name === 'OverconstrainedError') {
        stopFeed();
      }

      setErrorMessage(
        error.name === 'NotAllowedError'
          ? 'אופס! אין הרשאות למצלמה בדפדפן שלך.'
          : error.name === 'NotFoundError'
          ? 'אופס! לא נמצאה מצלמה בדפדפן שלך.'
          : 'שגיאה בהפעלת המצלמה, נסה לרענן את הדף או לבדוק את ההגדרות של הדפדפן שלך.'
      );
    }
  };

  const stopFeed = (onStop?: () => void) => {
    onStop?.();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const freezeFrame = (dataUrl: string | null, onFreeze?: () => void) => {
    setStalePhoto(dataUrl);
    onFreeze && onFreeze();
  };

  const restartFeed = (onStartFeed?: () => void) => {
    setStalePhoto(null);
    setErrorMessage(null);
    setCantUseCamera(false);
    startFeed(onStartFeed);
  };

  return {
    videoRef,
    streamRef,
    captureFrameAsBase64,
    startFeed,
    stopFeed,
    freezeFrame,
    restartFeed,
    stalePhoto,
    errorMessage,
    cantUseCamera,
  };
}

export default useCameraFeedControl;
