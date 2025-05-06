import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import coinAnimation from '../../../../assets/images/animations/Animation - 1746434987195.json';
import { sprinkleConfettiOnScreen } from '../../../../utils/confetti';
import './SuccessPopup.scss';

const SuccessPopup = () => {
  const earnedCoins = 10;
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      sprinkleConfettiOnScreen(popupRef.current, {
        zIndex: '5',
        borderRadius: '20px',
      });
    }
  }, []);

  const playAgain = () => {
    //TODO: functionality
  };
  const backToGames = () => {
    //TODO: functionality
  };

  return (
    <div ref={popupRef} className="success-popup">
      <Lottie
        animationData={coinAnimation}
        loop={true}
        autoplay={true}
        className="coin-animation"
      />
      <p className="success-message">congratulations!</p>
      <p className="coins-earned">You've won {earnedCoins} coins</p>
      <div className="button-row">
        <button className="popup-button left" onClick={playAgain}>
          Play again
        </button>
        <button className="popup-button right" onClick={backToGames}>
          Back to games
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
