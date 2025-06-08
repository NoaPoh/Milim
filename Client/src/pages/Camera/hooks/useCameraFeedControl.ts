import { useEffect, useRef, useState } from 'react';
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
  const [facingMode, setFacingMode] = useState<CameraFacingMode>(
    CameraFacingMode.BACK
  );

  const captureFrameAsBase64 = (): string | null => {
    return convertVideoToBase64(videoRef.current);
  };

  useEffect(() => {
    console.log(`Camera facing mode set to: ${facingMode}.`);
    restartFeed(() => {
      console.log(`Camera feed restarted with facing mode: ${facingMode}`);
    });
  }, [facingMode]);

  const toggleCameraFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === CameraFacingMode.BACK
        ? CameraFacingMode.FRONT
        : CameraFacingMode.BACK
    );
  };

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
          ? 'Permission denied. Please allow access to your webcam.'
          : error.name === 'OverconstrainedError'
          ? 'Back camera not available. Try switching to the front camera.'
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
    toggleCameraFacingMode,
  };
}

export default useCameraFeedControl;
