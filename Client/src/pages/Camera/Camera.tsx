import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Camera.scss';
import SpeakerButton from '../../components/SpeakerButton';
import { trpc } from '../../utils/trpc';
import Loader from '../../components/Loader/Loader';
import { sprinkleConfettiOnScreen } from '../../utils/confetti';
import CollectionDrawer from './CollectionDrawer';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabledCamera, setDisabledCamera] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const objectVisibleSinceRef = useRef<number | null>(null);

  const {
    data: imageLabel,
    isPending: detectLabelIsPending,
    mutateAsync: detectLabel,
  } = trpc.word.detectLabel.useMutation({
    onSuccess: () => sprinkleConfettiOnScreen(),
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;

      // Start detection loop after video feed is live
      startDetectionLoop();
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setDisabledCamera(true);
      if (error.name === 'NotAllowedError') {
        setErrorMessage(
          'Permission denied. Please allow access to your webcam.'
        );
      } else {
        setErrorMessage('Error accessing webcam. Please try again.');
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      setPhoto(dataUrl);

      // Stop detection loop
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
      objectVisibleSinceRef.current = null;
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setErrorMessage(null);
    startCamera();
  };

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

  const sendDetectLabels = async () => {
    const frameBase64 = captureFrameAsBase64();
    if (frameBase64) {
      await detectLabel({ image: frameBase64 });
    }
  };

  const startDetectionLoop = () => {
    detectionIntervalRef.current = setInterval(sendDetectLabels, 2000);
    // sendDetectLabels();
  };

  return (
    <div className="photo-capture-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!photo ? (
        <>
          <video ref={videoRef} autoPlay muted className="video-preview" />

          <button
            className="button"
            disabled={disabledCamera}
            onClick={takePhoto}
          >
            <FontAwesomeIcon icon={faCamera} className="icon" />
          </button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" className="captured-photo" />
          <button className="button" onClick={retakePhoto}>
            <FontAwesomeIcon icon={faArrowsRotate} className="icon" />{' '}
          </button>
          {detectLabelIsPending && <Loader />}
          {!detectLabelIsPending && imageLabel && (
            <div className="predictions-container">
              <p className="prediction-item">{imageLabel}</p>
              <SpeakerButton text={imageLabel}></SpeakerButton>
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
