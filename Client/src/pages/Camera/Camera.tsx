import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Camera.scss';
import SpeakerButton from '../../components/SpeakerButton';
import Loader from '../../components/Loader/Loader';
import CollectionDrawer from './CollectionDrawer';
import { sprinkleConfettiOnScreen } from '../../utils/confetti';
import { trpc } from '../../utils/trpc';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cantUseCamera, setCantUseCamera] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: imageLabel,
    isPending: detectLabelIsPending,
    mutateAsync: detectLabel,
  } = trpc.word.detectLabel.useMutation({
    onSuccess: () => {
      takePhoto();
      sprinkleConfettiOnScreen();
    },
  });

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

  const sendDetectLabels = useCallback(async () => {
    const frameBase64 = captureFrameAsBase64();
    if (frameBase64) await detectLabel({ image: frameBase64 });
  }, [detectLabel]);

  const startDetectionLoop = () => {
    detectionIntervalRef.current = setInterval(sendDetectLabels, 2000);
  };

  const stopDetectionLoop = () => {
    if (detectionIntervalRef.current) {
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

  const takePhoto = () => {
    const dataUrl = captureFrameAsBase64();
    setPhoto(dataUrl);
    stopDetectionLoop();
    if (dataUrl) detectLabel({ image: dataUrl });
  };

  const restartFeed = () => {
    setPhoto(null);
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

      {!photo ? (
        <>
          <video ref={videoRef} autoPlay muted className="video-preview" />
          <button
            className="button"
            disabled={cantUseCamera}
            onClick={takePhoto}
          >
            <FontAwesomeIcon icon={faCamera} className="icon" />
          </button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" className="captured-photo" />
          <button className="button" onClick={restartFeed}>
            <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
          </button>
          {detectLabelIsPending && <Loader />}
          {!detectLabelIsPending && imageLabel && (
            <div className="predictions-container">
              <p className="prediction-item">{imageLabel}</p>
              <SpeakerButton text={imageLabel} />
            </div>
          )}
          <button className="btn" onClick={() => setDrawerOpen(true)}>
            Add To Collection
          </button>
          <CollectionDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            newWord={imageLabel || ''}
            picture={photo || ''}
          />
        </>
      )}
    </div>
  );
}
