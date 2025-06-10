import { createContext, useContext, useState, ReactNode } from 'react';
import EndGamePopup from './EndGamePopup';
import { RoutesValues } from '../../../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../utils/trpcClient.ts';

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
  const apiUtils = api.useUtils();


  const showPopup = (config: EndGamePopupConfig) => {
    setPopupConfig(config);
  };

  const handleClose = () => {
    setPopupConfig(null);
  };

  const returnToGames = async() => {
    await apiUtils.user.getUser.invalidate();
    navigate(RoutesValues.GAMES);
    handleClose();
  }

  const navigate = useNavigate();

  return (
    <EndGamePopupContext.Provider value={{ showPopup }}>
      {children}
      {popupConfig && (
        <EndGamePopup
          earnedCoins={popupConfig.earnedCoins}
          onPlayAgain={popupConfig.onPlayAgain}
          onBack={returnToGames}
          onClose={handleClose}
        />
      )}
    </EndGamePopupContext.Provider>
  );
};
