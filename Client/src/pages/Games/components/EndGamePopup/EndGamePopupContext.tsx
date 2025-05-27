import { createContext, useContext, useState, ReactNode } from 'react';
import EndGamePopup from './EndGamePopup';
import { RoutesValues } from '../../../../routes/routes';
import { useNavigate } from 'react-router-dom';

type EndGamePopupConfig = {
  earnedCoins?: number;
  onPlayAgain?: () => void;
};

type EndGamePopupContextType = {
  showPopup: (config: EndGamePopupConfig) => void;
};

const EndGamePopupContext = createContext<EndGamePopupContextType | undefined>(
  undefined
);

export const useEndGamePopup = () => {
  const context = useContext(EndGamePopupContext);
  if (!context)
    throw new Error(
      'useEndGamePopup must be used within a EndGamePopupProvider'
    );
  return context;
};

export const EndGamePopupProvider = ({ children }: { children: ReactNode }) => {
  const [popupConfig, setPopupConfig] = useState<EndGamePopupConfig | null>(
    null
  );

  const showPopup = (config: EndGamePopupConfig) => {
    setPopupConfig(config);
  };

  const handleClose = () => {
    setPopupConfig(null);
  };

  const navigate = useNavigate();

  return (
    <EndGamePopupContext.Provider value={{ showPopup }}>
      {children}
      {popupConfig && (
        <EndGamePopup
          earnedCoins={popupConfig.earnedCoins}
          onPlayAgain={popupConfig.onPlayAgain}
          onBack={() => {
            navigate(RoutesValues.GAMES);
            handleClose();
          }}
          onClose={handleClose}
        />
      )}
    </EndGamePopupContext.Provider>
  );
};
