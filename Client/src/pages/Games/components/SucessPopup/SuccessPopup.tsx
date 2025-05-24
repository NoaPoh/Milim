// SuccessPopup.tsx
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import coinAnimation from '../../../../assets/images/animations/Animation - 1746434987195.json';
import { sprinkleConfettiOnScreen } from '../../../../utils/confetti';
import './SuccessPopup.scss';

type Props = {
  earnedCoins: number;
  onPlayAgain?: () => void;
  onBack?: () => void;
  onClose?: () => void;
};

const SuccessPopup = ({ earnedCoins, onPlayAgain, onBack, onClose }: Props) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      sprinkleConfettiOnScreen(popupRef.current, {
        zIndex: '5',
        borderRadius: '20px',
      });
    }
  }, []);

  return (
    <div className="popup-overlay">
      <div ref={popupRef} className="success-popup">
        <Lottie
          animationData={coinAnimation}
          loop
          autoplay
          className="coin-animation"
        />
        <p className="success-message">congratulations!</p>
        <p className="coins-earned">You've won {earnedCoins} coins</p>
        <div className="button-row">
          <button
            className="popup-button left"
            onClick={() => {
              onPlayAgain?.();
              onClose?.();
            }}
          >
            Play again
          </button>
          <button
            className="popup-button right"
            onClick={() => {
              onBack?.();
              onClose?.();
            }}
          >
            Back to games
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
