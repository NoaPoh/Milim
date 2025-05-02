import { useState, useEffect } from 'react';
import './Camera.scss';
import useCameraFeed from './hooks/useCameraFeed';
import useObjectDetection from './hooks/useObjectDetection';
import CameraFeed from './components/Feed/CameraFeed';
import PicturePreview from './components/Feed/PicturePreview';

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

      {!stalePhoto ? (
        <CameraFeed
          ref={videoRef}
          onTakePicture={onTakePictureButton}
          cantUseCamera={cantUseCamera}
        />
      ) : (
        <PicturePreview
          image={stalePhoto}
          onRestart={() => restartFeed(startDetectionLoop)}
          detectedObject={detectedObject}
          isDetecting={detectObjectIsPending}
        />
      )}
    </div>
  );
}
