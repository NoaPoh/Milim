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

  const getCameraStream = async (): Promise<MediaStream> => {
    try {
      // iOS-specific workaround: Request access to any back camera to unlock device labels.
      // On iPhones, device labels are not available until camera permission is granted.
      // This step ensures we can enumerate and select the correct camera afterwards.
      try {
        (
          await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          })
        )
          .getTracks()
          .forEach((track) => track.stop());
      } catch (iosUnlockError) {
        console.warn(
          'iOS camera permission unlock step failed:',
          iosUnlockError
        );
        // Continue: fallback logic will attempt to enumerate devices and select a camera.
      }

      const devices = await navigator.mediaDevices.enumerateDevices();

      // Look for "camera 0, facing back"
      const mainBackCamera = devices.find(
        (d) =>
          d.kind === 'videoinput' &&
          d.label.toLowerCase().includes('camera 0, facing back')
      );

      if (mainBackCamera) {
        console.log('Using main back camera:', mainBackCamera.label);
        return await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: mainBackCamera.deviceId } },
        });
      }

      // fallback: just pick any back camera
      const fallback1 = devices.find(
        (d) => d.kind === 'videoinput' && d.label.toLowerCase().includes('back')
      );

      if (fallback1) {
        console.log('Using fallback back camera:', fallback1.label);
        return await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: fallback1.deviceId } },
        });
      }

      const fallback2 = navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (fallback2) {
        console.log('Using fallback back camera (environment):', fallback2);
        return await fallback2;
      }

      // fallback to front camera if nothing matched
      console.log('Using default front camera (facingMode)');
      return await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
    } catch (error: any) {
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
