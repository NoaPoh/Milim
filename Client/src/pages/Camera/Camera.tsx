import { useEffect } from 'react';
import './Camera.scss';
import useCameraFeedControl from './hooks/useCameraFeedControl';
import CameraFeed from './components/Feed/CameraFeed';
import PicturePreview from './components/Feed/PicturePreview';
import { api } from '../../utils/trpcClient';
import { useVideoStability } from './hooks/useVideoStability';
import { showErrorToast } from '../../utils/toast';

export default function CameraPage() {
  const apiUtils = api.useUtils();

  const {
    videoRef,
    startFeed,
    stopFeed,
    freezeFrame,
    restartFeed,
    stalePhoto,
    errorMessage,
    cantUseCamera,
    captureFrameAsBase64,
    toggleCameraFacingMode,
  } = useCameraFeedControl();

  const {
    data: detectedObject,
    isPending: detectObjectIsPending,
    mutateAsync: detectObject,
  } = api.externals.detectObject.useMutation({
    onSuccess: (_data, originalImage) => {
      freezeFrame(originalImage);
      apiUtils.externals.translateWord.invalidate();
    },
    onError: (error) => {
      console.error('Error detecting object:', error);
      restartFeed();
      apiUtils.externals.translateWord.invalidate();
    },
    retryDelay: 2000,
  });

  const { data: translatedWord } = api.externals.translateWord.useQuery(
    { word: detectedObject },
    {
      enabled: !!detectedObject,
    }
  );

  const takePicture = () => {
    const frameBase64 = captureFrameAsBase64();
    freezeFrame(frameBase64);
    if (frameBase64) detectObject(frameBase64);
  };

  useEffect(() => {
    startFeed();
    return () => stopFeed();
  }, []);

  useVideoStability(videoRef, cantUseCamera, takePicture);

  useEffect(() => {
    errorMessage && showErrorToast(errorMessage);
  }, [errorMessage]);

  return (
    <div className="CameraPage">
      {!stalePhoto ? (
        <CameraFeed
          ref={videoRef}
          onTakePicture={takePicture}
          cantUseCamera={cantUseCamera}
          toggleCameraFacingMode={toggleCameraFacingMode}
        />
      ) : (
        <PicturePreview
          image={stalePhoto}
          onRestart={() => restartFeed()}
          detectedObject={detectedObject}
          translatedWord={translatedWord}
          isDetecting={detectObjectIsPending}
        />
      )}
    </div>
  );
}
