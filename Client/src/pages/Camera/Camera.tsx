import React, { useState, useRef, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCamera } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Camera.scss';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[]>([]);
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disabledCamera, setDisabledCamera] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
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
    }
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
      <h1 className="title">Take a Photo</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!photo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="video-preview"
          ></video>
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
          {predictionLoading && <div className="loading-spinner" />}

          {!predictionLoading && predictions.length > 0 && (
            <div className="predictions-container">
              <>
                <p className="prediction-item">{predictions[0].class}</p>
                <p className="prediction-translation">תרגום</p>
              </>
            </div>
          )}
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        </>
      )}
    </div>
  );
}
