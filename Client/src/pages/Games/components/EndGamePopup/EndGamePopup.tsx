import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import coinAnimation from '../../../../assets/images/animations/Animation - 1746434987195.json';
import ohno from '../../../../assets/images/ohno.png';
import { sprinkleConfettiOnScreen } from '../../../../utils/confetti';
import './EndGamePopup.scss';

type Props = {
  earnedCoins?: number;
  onPlayAgain?: () => void;
  onBack?: () => void;
  onClose?: () => void;
};

const EndGamePopup = ({
  earnedCoins = 0,
  onPlayAgain,
  onBack,
  onClose,
}: Props) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const isSad = earnedCoins === 0;

  useEffect(() => {
    if (popupRef.current && !isSad) {
      sprinkleConfettiOnScreen(popupRef.current, {
        zIndex: '5',
        borderRadius: '20px',
      });
    }
  }, []);

  return (
    <div className="popup-overlay">
      <div className={`endgame-popup ${isSad ? 'sad' : ''}`} ref={popupRef}>
        {isSad ? (
          <div className="sad-content">
            <img src={ohno} alt="Sad face" className="sad-icon" />
            <p className="coins-earned">
              You didn't earn any coins this time. You can always play again!
            </p>
          </div>
        ) : (
          <div className="success-content">
            <Lottie
              animationData={coinAnimation}
              loop
              autoplay
              className="coin-animation"
            />
            <p className="success-message">Congratulations!</p>
            <p className="coins-earned">You've won {earnedCoins} coins!</p>
          </div>
        )}

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
          <button className="popup-button right" onClick={onBack}>
            Back to games
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGamePopup;
