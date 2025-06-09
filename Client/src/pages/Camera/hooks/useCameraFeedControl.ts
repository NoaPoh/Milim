import { useEffect, useRef, useState } from 'react';
import { convertVideoToBase64 } from '../../../utils/video';
import { isMobile } from 'react-device-detect';

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

  const facingMode = isMobile ? CameraFacingMode.BACK : CameraFacingMode.FRONT;

  const captureFrameAsBase64 = (): string | null => {
    return convertVideoToBase64(videoRef.current);
  };

  useEffect(() => {
    console.log(`Camera facing mode set to: ${facingMode}.`);
    restartFeed(() => {
      console.log(`Camera feed restarted with facing mode: ${facingMode}`);
    });
  }, [facingMode]);

  const startFeed = async (onStart?: () => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: facingMode } }, // request back camera
      });
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
          : error.name === 'OverconstrainedError'
          ? 'נראה שאין לנו מצלמה אחורית. בוא ננסה את הקדמית בכפתור החלפה!'
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
