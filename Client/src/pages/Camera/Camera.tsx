import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Camera.scss';
import SpeakerButton from '../../components/SpeakerButton';
import Loader from '../../components/Loader/Loader';
import CollectionDrawer from './components/CollectionDrawer/CollectionDrawer';
import useCameraFeed from './hooks/useCameraFeed';
import useObjectDetection from './hooks/useObjectDetection';

export default function Camera() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    videoRef,
    captureFrameAsBase64,
    startFeed,
    stopFeed,
    freezeFrame,
    restartFeed,
    stalePhoto,
    errorMessage,
    cantUseCamera,
  } = useCameraFeed();

  const {
    detectObject,
    detectedObject,
    detectObjectIsPending,
    startDetectionLoop,
    stopDetectionLoop,
  } = useObjectDetection({
    freezeFrame,
    captureFrameAsBase64,
  });

  const onTakePictureButton = () => {
    const dataUrl = captureFrameAsBase64();
    freezeFrame(dataUrl, stopDetectionLoop);

    if (dataUrl) detectObject({ image: dataUrl });
  };

  useEffect(() => {
    startFeed(startDetectionLoop);
    return () => stopFeed(stopDetectionLoop);
  }, []);

  return (
    <div className="photo-capture-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!stalePhoto ? (
        <>
          <video ref={videoRef} autoPlay muted className="video-preview" />
          <button
            className="button"
            disabled={cantUseCamera}
            onClick={onTakePictureButton}
          >
            <FontAwesomeIcon icon={faCamera} className="icon" />
          </button>
        </>
      ) : (
        <>
          <img src={stalePhoto} alt="Captured" className="captured-photo" />
          <button
            className="button"
            onClick={() => restartFeed(startDetectionLoop)}
          >
            <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
          </button>
          {detectObjectIsPending && <Loader />}
          {!detectObjectIsPending && detectedObject && (
            <div className="predictions-container">
              <p className="prediction-item">{detectedObject}</p>
              <SpeakerButton text={detectedObject} />
              <button className="btn" onClick={() => setDrawerOpen(true)}>
                Add To Collection
              </button>
            </div>
          )}
          <CollectionDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            newWord={detectedObject || ''}
            picture={stalePhoto || ''}
          />
        </>
      )}
    </div>
  );
}
