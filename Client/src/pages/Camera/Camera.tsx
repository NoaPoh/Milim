import React, { useState, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[]>([]);
  const [isWebcamStarted, setIsWebcamStarted] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      setIsWebcamStarted(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setIsWebcamStarted(false);
      console.error('Error accessing webcam:', error);
    }
  };

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
    startCamera();
  };

  const predictObject = async () => {
    if (!photo) return;

    setPredictionLoading(true);

    const model = await cocoSsd.load();

    const img = new Image();
    img.src = photo;
    img.onload = async () => {
      const predictions = await model.detect(img);
      console.log('Predictions:', predictions);
      setPredictions(predictions);
      setPredictionLoading(false);
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Take a Photo</h1>
      {!photo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="relative h-64 bg-black"
          ></video>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4"
            onClick={startCamera}
          >
            Start Camera
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2"
            onClick={takePhoto}
          >
            Capture 📸
          </button>
        </>
      ) : (
        <>
          <img src={photo} alt="Captured" className="h-64" />
          {predictionLoading ? (
            <p>Loading</p>
          ) : (
            <button
              className="bg-yellow-500 text-white px-4 py-2 mt-2"
              onClick={predictObject}
            >
              Predict 🔍
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 mt-2"
            onClick={retakePhoto}
          >
            Retake 🔄
          </button>

          {!predictionLoading && predictions.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Predictions:</h2>
              <ul>
                {predictions.map((pred, index) => (
                  <li key={index}>
                    {pred.class} - {Math.round(pred.score * 100)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
