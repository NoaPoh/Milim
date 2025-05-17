import React from 'react';
import './Profile.scss';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import coinsIcon from '../../assets/images/coins.png';
import { useUser } from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';
import { UserDTO } from 'milim-server/src/@types/dtos';
import { api } from '../../utils/trpcClient.ts';
import { RoutesValues } from '../../routes/routes.ts';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';

const Profile: React.FC = () => {
  const { user, isLoading }: {user: UserDTO, isLoading: boolean} = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    api.auth.logout.useMutation({ onSuccess: navigate(RoutesValues.LOGIN) });
  };

  if (isLoading)
    return <Loader />;

  return (
    <div className="profile-container">
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOut} />
      </button>
      <AnimalIcon iconWidth={230} path={user.spiritAnimal} />
      <div className="coins-section">
        <img
          src={coinsIcon}
          className="image rounded-full"
          alt="missing your info!" />
        <span className="text">
        {user.coins}
        </span>
      </div>
    </div>
  );
};


export default Profile;
