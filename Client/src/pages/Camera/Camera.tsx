import { useEffect } from 'react';
import './Camera.scss';
import useCameraFeedControl from './hooks/useCameraFeedControl';
import CameraFeed from './components/Feed/CameraFeed';
import PicturePreview from './components/Feed/PicturePreview';
import { api } from '../../utils/trpcClient';
import { Toaster } from 'react-hot-toast';
import { useVideoStability } from './hooks/useVideoStability';

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

  useVideoStability(videoRef, takePicture);

  return (
    <div className="photo-capture-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!stalePhoto ? (
        <CameraFeed
          ref={videoRef}
          onTakePicture={takePicture}
          cantUseCamera={cantUseCamera}
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
