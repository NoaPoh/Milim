import { useRef, useState } from 'react';
import { convertVideoToBase64 } from '../../../utils/video';

function useCameraFeedControl() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [stalePhoto, setStalePhoto] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cantUseCamera, setCantUseCamera] = useState<boolean>(false);

  const captureFrameAsBase64 = (): string | null => {
    return convertVideoToBase64(videoRef.current);
  };

  const startFeed = async (onStart?: () => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      onStart?.();
    } catch (error: any) {
      setCantUseCamera(true);
      setErrorMessage(
        error.name === 'NotAllowedError'
          ? 'Permission denied. Please allow access to your webcam.'
          : 'Error accessing webcam. Please try again.'
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
