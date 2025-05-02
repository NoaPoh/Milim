import { useCallback, useEffect, useRef } from 'react';
import { sprinkleConfettiOnScreen } from '../../../utils/confetti';
import { api } from '../../../utils/trpc';

type UseObjectDetectionProps = {
  freezeFrame: (dataUrl: string | null, onFreeze?: () => void) => void;
  captureFrameAsBase64: () => string | null;
};

function useObjectDetection(props: UseObjectDetectionProps) {
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: detectedObject,
    isPending: detectObjectIsPending,
    mutateAsync: detectObject,
  } = api.word.detectObject.useMutation({
    onSuccess: (_data, variables) => {
      props.freezeFrame(variables.image, stopDetectionLoop);
      sprinkleConfettiOnScreen();
    },
  });

  const detectObjectIsPendingRef = useRef(detectObjectIsPending);
  useEffect(() => {
    detectObjectIsPendingRef.current = detectObjectIsPending;
  }, [detectObjectIsPending]);

  const sendDetectObjects = useCallback(async () => {
    console.log('Detect object is pending:', detectObjectIsPendingRef.current);
    if (detectObjectIsPendingRef.current) return;

    const frameBase64 = props.captureFrameAsBase64();
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

  return {
    detectObject,
    detectedObject,
    detectObjectIsPending,
    startDetectionLoop,
    stopDetectionLoop,
  };
}

export default useObjectDetection;
