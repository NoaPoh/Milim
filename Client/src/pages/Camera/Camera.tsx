import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Camera.scss';
import SpeakerButton from '../../components/SpeakerButton';
import Loader from '../../components/Loader/Loader';
import CollectionDrawer from './CollectionDrawer';
import { sprinkleConfettiOnScreen } from '../../utils/confetti';
import { api } from '../../utils/trpc';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [stalePhoto, setStalePhoto] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cantUseCamera, setCantUseCamera] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: detectedObject,
    isPending: detectObjectIsPending,
    mutateAsync: detectObject,
  } = api.word.detectObject.useMutation({
    onSuccess: (data, variables) => {
      freezeFrame(variables.image);
      sprinkleConfettiOnScreen();
    },
  });

  const detectObjectIsPendingRef = useRef(detectObjectIsPending);
  useEffect(() => {
    detectObjectIsPendingRef.current = detectObjectIsPending;
  }, [detectObjectIsPending]);

  const captureFrameAsBase64 = (): string | null => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0)
      return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return null;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  };

  const sendDetectObjects = useCallback(async () => {
    console.log('Detect object is pending:', detectObjectIsPendingRef.current);
    if (detectObjectIsPendingRef.current) return;

    const frameBase64 = captureFrameAsBase64();
    if (frameBase64) await detectObject({ image: frameBase64 });
  }, [detectObject]);

  const startDetectionLoop = () => {
    detectionIntervalRef.current = setInterval(sendDetectObjects, 2000);
  };

  const stopDetectionLoop = () => {
    if (detectionIntervalRef.current) {
      console.log('Stopping detection loop...');
      clearInterval(detectionIntervalRef.current);
    }
    detectionIntervalRef.current = null;
  };

  const startFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      startDetectionLoop();
    } catch (error: any) {
      console.error('Error accessing webcam:', error);
      setCantUseCamera(true);
      setErrorMessage(
        error.name === 'NotAllowedError'
          ? 'Permission denied. Please allow access to your webcam.'
          : 'Error accessing webcam. Please try again.'
      );
    }
  };

  const stopFeed = () => {
    stopDetectionLoop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const freezeFrame = (dataUrl: string | null) => {
    setStalePhoto(dataUrl);
    stopDetectionLoop();
  };

  const onTakePictureButton = () => {
    const dataUrl = captureFrameAsBase64();
    freezeFrame(dataUrl);

    if (dataUrl) detectObject({ image: dataUrl });
  };

  const restartFeed = () => {
    setStalePhoto(null);
    setErrorMessage(null);
    setCantUseCamera(false);
    startFeed();
  };

  useEffect(() => {
    startFeed();
    return () => stopFeed();
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
          <button className="button" onClick={restartFeed}>
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
