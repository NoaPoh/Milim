import { useCallback, useEffect, useRef } from 'react';
import { sprinkleConfettiOnScreen } from '../../../utils/confetti';
import { api } from '../../../utils/trpcClient';
import { convertVideoToBase64 } from '../../../utils/video';

type UseObjectDetectionProps = {
  freezeFrame: (dataUrl: string | null, onFreeze?: () => void) => void;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
};

function useObjectDetection(props: UseObjectDetectionProps) {
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const apiUtils = api.useUtils();

  const {
    data: detectedObject,
    isPending: detectObjectIsPending,
    mutateAsync: detectObject,
  } = api.externals.detectObject.useMutation({
    onSuccess: (_data, variables) => {
      props.freezeFrame(variables.image, stopDetectionLoop);
      sprinkleConfettiOnScreen();
      apiUtils.externals.translateWord.invalidate();
    },
    retryDelay: 2000,
  });

  const detectObjectIsPendingRef = useRef(detectObjectIsPending);
  useEffect(() => {
    detectObjectIsPendingRef.current = detectObjectIsPending;
  }, [detectObjectIsPending]);

  const sendDetectObjects = useCallback(async () => {
    if (detectObjectIsPendingRef.current) return;

    const frameBase64 = convertVideoToBase64(props.videoRef.current);
    if (frameBase64) await detectObject({ image: frameBase64 });
  }, [detectObject]);

  const startDetectionLoop = () => {
    detectionIntervalRef.current = setInterval(sendDetectObjects, 2000);
  };

  const stopDetectionLoop = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    detectionIntervalRef.current = null;
  };

  const singleDetectObject = async () => {
    const frameBase64 = convertVideoToBase64(props.videoRef.current);
    props.freezeFrame(frameBase64, stopDetectionLoop);

    if (frameBase64) await detectObject({ image: frameBase64 });
  };

  return {
    detectObject,
    detectedObject,
    detectObjectIsPending,
    startDetectionLoop,
    stopDetectionLoop,
    singleDetectObject,
  };
}

export default useObjectDetection;
