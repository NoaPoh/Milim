import { useEffect } from 'react';
import './Camera.scss';
import useCameraFeed from './hooks/useCameraFeed';
import useObjectDetection from './hooks/useObjectDetection';
import CameraFeed from './components/Feed/CameraFeed';
import PicturePreview from './components/Feed/PicturePreview';
import { api } from '../../utils/trpcClient';

export default function Camera() {
  const {
    videoRef,
    startFeed,
    stopFeed,
    freezeFrame,
    restartFeed,
    stalePhoto,
    errorMessage,
    cantUseCamera,
  } = useCameraFeed();

  const {
    singleDetectObject,
    detectedObject,
    detectObjectIsPending,
    startDetectionLoop,
    stopDetectionLoop,
  } = useObjectDetection({
    freezeFrame,
    videoRef,
  });

  const { data: translatedWord } = api.externals.translateWord.useQuery(
    { word: detectedObject },
    {
      enabled: !!detectedObject,
    }
  );

  const onTakePictureButton = () => {
    singleDetectObject();
  };

  useEffect(() => {
    startFeed(startDetectionLoop);
    return () => stopFeed(stopDetectionLoop);
  }, []);

  return (
    <div className="photo-capture-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className='ribbon'>See It.<br/> Snap It. Learn It.</div>
      {!stalePhoto ? (
        <CameraFeed
          ref={videoRef}
          className="video-wrapper"
          onTakePicture={onTakePictureButton}
          cantUseCamera={cantUseCamera}
        />
      ) : (
        <PicturePreview
          image={stalePhoto}
          onRestart={() => restartFeed(startDetectionLoop)}
          detectedObject={detectedObject}
          translatedWord={translatedWord}
          isDetecting={detectObjectIsPending}
        />
      )}
    </div>
  );
}
