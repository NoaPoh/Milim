import React, { useState, useRef, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Camera.scss';
import SpeakerButton from '../../components/SpeakerButton';
import { trpc } from '../../utils/trpc';
import Loader from '../../components/Loader/Loader';
import { sprinkleConfettiOnScreen } from '../../utils/confetti';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[]>([]);
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabledCamera, setDisabledCamera] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const objectVisibleSinceRef = useRef<number | null>(null);
  const modelRef = useRef<cocoSsd.ObjectDetection | null>(null);

  const { mutateAsync: addWord, isPending: addWordIsLoading } =
    trpc.word.insertWord.useMutation();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;

      // Load model if not already loaded
      if (!modelRef.current) {
        modelRef.current = await cocoSsd.load();
      }

      startDetectionLoop(); // Start detecting after camera is on
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

  useEffect(() => {
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (photo) {
      predictObject();
    }
  }, [photo]);

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

  const startDetectionLoop = () => {
    detectionIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !modelRef.current) return;

      const video = videoRef.current;
      const model = modelRef.current;

      const predictions = await model.detect(video);
      const visibleObject = predictions.find((pred) => pred.score >= 0.6);

      if (visibleObject) {
        const now = Date.now();

        if (!objectVisibleSinceRef.current) {
          objectVisibleSinceRef.current = now;
        } else if (now - objectVisibleSinceRef.current >= 2000) {
          clearInterval(detectionIntervalRef.current!);
          takePhoto(); // Auto take photo
        }
      } else {
        objectVisibleSinceRef.current = null; // Reset timer if object disappears
      }
    }, 300); // Run detection every 300ms
  };

  const retakePhoto = () => {
    setPhoto(null);
    setErrorMessage(null);
    startCamera();
  };

  const predictObject = async () => {
    if (!photo) return;
    setPredictionLoading(true);
    setErrorMessage(null);

    try {
      const model = await cocoSsd.load();
      const img = new Image();
      img.src = photo;
      img.onload = async () => {
        const predictions = await model.detect(img);
        console.log('Predictions:', predictions);

        const filteredPredictions = predictions.filter(
          (pred) => pred.score >= 0.6
        );

        if (filteredPredictions.length === 0) {
          setErrorMessage('No objects detected with high confidence.');
        } else {
          const highestPrediction = filteredPredictions.reduce(
            (prev, current) => (prev.score > current.score ? prev : current)
          );

          setPredictions([highestPrediction]);
          sprinkleConfettiOnScreen();
        }
        setPredictionLoading(false);
      };
    } catch (error) {
      setErrorMessage('Prediction failed. Please try again.');
      setPredictionLoading(false);
    }
  };

  return (
    <div className="photo-capture-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!photo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="video-preview"
          ></video>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" className="captured-photo" />
          <button className="button" onClick={retakePhoto}>
            <FontAwesomeIcon icon={faArrowsRotate} className="icon" />{' '}
          </button>
          {predictionLoading && <Loader />}
          {!predictionLoading && predictions.length > 0 && (
            <div
              className="predictions-container"
            >
              <p className="prediction-item">{predictions[0].class}</p>
              <SpeakerButton text={predictions[0].class}></SpeakerButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}
