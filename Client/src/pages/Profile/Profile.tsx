import React, { useState } from 'react';
import './Profile.scss';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import coinsIcon from '../../assets/images/coins.png';
import { useUser } from '../../context/UserContext';
import GlobalLoader from '../../components/GlobalLoader/GlobalLoader.tsx';
import { UserDTO } from 'milim-server/types';
import { api } from '../../utils/trpcClient.ts';
import { RoutesValues } from '../../routes/routes.ts';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faSignOut } from '@fortawesome/free-solid-svg-icons';
import AwardShopModal from './components/ShopModal.tsx';
import { AwardType } from '../../constants/awards.types.ts';

const Profile: React.FC = () => {
  const { user, isLoading }: { user: UserDTO; isLoading: boolean } = useUser();
  const { mutate: logOut } = api.auth.logout.useMutation({
    onSuccess: () => navigate(RoutesValues.LOGIN),
  });

  const [isShopOpen, setShopOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <GlobalLoader />;

  const { activeAwards, coins, purchases, currentStreak } = user;

  const ownedAwardIds = purchases.map((purchase) => purchase.awardId);
  const activeAwardNames: string[] = Object.values(activeAwards);

  const handleLogout = () => {
    logOut();
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return '🔥 אגדה! רצף של 30 ימים ומעלה!';
    if (streak >= 14) return '💪 מדהים! יאללה לשמור על הקצב';
    if (streak >= 7) return '👏 שבוע שלם! איזה הישגגג!';
    return ' התחלה מעולה! יש לאן לשאוף!';
  };

  if (isLoading) return <GlobalLoader />;

  return (
    <div className="profile-container">
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOut} />
      </button>
      <div className="profile-section">
        <AnimalIcon
          iconWidth={230}
          path={activeAwards[AwardType.PROFILE_ICON] || ''}
          frame={activeAwards[AwardType.ICON_FRAME] || ''}
          background={activeAwards[AwardType.ICON_BACKGROUND] || ''}
        />
        <button className="shop button" onClick={() => setShopOpen(true)}>
          <FontAwesomeIcon icon={faShop} />
        </button>

        <AwardShopModal
          open={isShopOpen}
          onClose={() => setShopOpen(false)}
          coinBalance={coins}
          ownedAwardIds={ownedAwardIds}
          activeAwardNames={activeAwardNames}
        />
      </div>
      <div className="coins-section">
        <img
          src={coinsIcon}
          className="image rounded-full"
          alt="אין לנו את המידע שלך!"
        />
        <span className="text">{coins}</span>
      </div>
      {currentStreak > 0 && (
        <div className="streak-section" title="Current Streak">
          <span role="img" aria-label="fire" className="streak-icon">
            🔥
          </span>
          <span className="streak-number">{currentStreak}</span>
          <div className="streak-comment">
            {getStreakMessage(currentStreak)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
