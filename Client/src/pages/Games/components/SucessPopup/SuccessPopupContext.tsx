import { createContext, useContext, useState, ReactNode } from 'react';
import SuccessPopup from './SuccessPopup';
import { RoutesValues } from '../../../../routes/routes';
import { useNavigate } from 'react-router-dom';

type SuccessPopupConfig = {
  earnedCoins: number; //TODO: should be calculated
  onPlayAgain?: () => void;
};

type SuccessPopupContextType = {
  showPopup: (config: SuccessPopupConfig) => void;
};

const SuccessPopupContext = createContext<SuccessPopupContextType | undefined>(
  undefined
);

export const useSuccessPopup = () => {
  const context = useContext(SuccessPopupContext);
  if (!context)
    throw new Error(
      'useSuccessPopup must be used within a SuccessPopupProvider'
    );
  return context;
};

export const SuccessPopupProvider = ({ children }: { children: ReactNode }) => {
  const [popupConfig, setPopupConfig] = useState<SuccessPopupConfig | null>(
    null
  );

  const showPopup = (config: SuccessPopupConfig) => {
    setPopupConfig(config);
  };

  const handleClose = () => {
    setPopupConfig(null);
  };

  const navigate = useNavigate();

  return (
    <SuccessPopupContext.Provider value={{ showPopup }}>
      {children}
      {popupConfig && (
        <SuccessPopup
          earnedCoins={popupConfig.earnedCoins}
          onPlayAgain={popupConfig.onPlayAgain}
          onBack={() => {
            navigate(RoutesValues.GAMES);
          }}
          onClose={handleClose}
        />
      )}
    </SuccessPopupContext.Provider>
  );
};
