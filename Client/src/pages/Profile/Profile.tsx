import React, { useState } from 'react';
import './Profile.scss';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import coinsIcon from '../../assets/images/coins.png';
import { ActiveAwards, useUser } from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';
import { UserDTO } from 'milim-server/src/@types/dtos';
import { api } from '../../utils/trpcClient.ts';
import { RoutesValues } from '../../routes/routes.ts';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faSignOut } from '@fortawesome/free-solid-svg-icons';
import AwardShopModal from './components/ShopModal.tsx';
import { AwardType } from '@prisma/client';

const Profile: React.FC = () => {
  const { user, isLoading }: {user: UserDTO & ActiveAwards, isLoading: boolean} = useUser();
  const [isShopOpen, setShopOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading)
    return <Loader />;

  const { activeAwards, coins, purchases, spiritAnimal } = user;

  const ownedAwardIds = purchases.map(purchase => purchase.awardId);
  const activeAwardIds: number[] = Object.values(activeAwards);

  const handleLogout = () => {
    api.auth.logout.useMutation({ onSuccess: navigate(RoutesValues.LOGIN) });
  };

  return (
    <div className="profile-container">
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOut} />
      </button>
      <div className="profile-section">
        <AnimalIcon iconWidth={230} path={spiritAnimal}
                    frame={activeAwards[AwardType.ICON_FRAME]}
                    background={activeAwards[AwardType.ICON_BACKGROUND]}/>
        <button
          className="shop button"
          onClick={() => setShopOpen(true)}
        >
          <FontAwesomeIcon icon={faShop} />
        </button>

        <AwardShopModal
          open={isShopOpen}
          onClose={() => setShopOpen(false)}
          coinBalance={coins}
          ownedAwardIds={ownedAwardIds}
          activeAwardNames={activeAwardIds}
        />
      </div>
      <div className="coins-section">
        <img
          src={coinsIcon}
          className="image rounded-full"
          alt="missing your info!" />
        <span className="text">
        {coins}
        </span>
      </div>
    </div>
  );
};


export default Profile;
