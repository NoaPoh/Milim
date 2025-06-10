import { useEffect, useRef } from 'react';
import pixelmatch from 'pixelmatch';
import { convertVideoToData } from '../../../utils/video';

const FRAME_INTERVAL = 300; // check every 0.3s
const STABILITY_DURATION = 500; // require stability for 0.5s
const DIFFERENCE_THRESHOLD = 500; // different pixels threshold
const START_DELAY = 2000; // delay before starting stability checks (1 second)

export function useVideoStability(
  videoRef: React.RefObject<HTMLVideoElement>,
  cantUseCamera: boolean,
  onStable: () => void
) {
  const previousImageData = useRef<ImageData | null>(null);
  const stableStart = useRef<number | null>(null);
  const isStable = useRef(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let delayTimeoutId: NodeJS.Timeout;

    if (cantUseCamera) {
      console.log('Camera is not usable, skipping stability checks');
      return;
    }

    const checkStability = () => {
      const video = videoRef.current;
      const currentImageData = convertVideoToData(video);

      if (!currentImageData) return;

      if (previousImageData.current) {
        const diffPixels = pixelmatch(
          previousImageData.current.data,
          currentImageData.data,
          undefined,
          currentImageData.width,
          currentImageData.height,
          { threshold: 0.1 } // this threshold is pixelmatch-specific (0 to 1)
        );

        // If the difference in pixels is below the threshold, consider it stable
        if (diffPixels < DIFFERENCE_THRESHOLD) {
          // If this is the first stable frame, start the timer
          if (!stableStart.current) {
            stableStart.current = Date.now();
          } else if (
            // If we've been stable for the required duration, trigger the callback
            Date.now() - stableStart.current >= STABILITY_DURATION &&
            !isStable.current
          ) {
            isStable.current = true;
            console.log('Video is stable, triggering callback');
            onStable();
          }
        } else {
          stableStart.current = null;
          isStable.current = false;
        }
      }

      previousImageData.current = currentImageData;
    };

    delayTimeoutId = setTimeout(() => {
      console.log('Starting video stability checks');
      intervalId = setInterval(checkStability, FRAME_INTERVAL);
    }, START_DELAY);

    return () => {
      console.log('Cleaning up video stability checks');
      clearTimeout(delayTimeoutId);
      clearInterval(intervalId);
    };
  }, [videoRef, onStable, cantUseCamera]);
}
