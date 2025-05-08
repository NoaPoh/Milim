import React from 'react';
import './Profile.scss';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import coinsIcon from '../../assets/images/coins.png';
import { useUser } from '../../context/UserContext';
import Loader from '../../components/Loader/Loader';
import { UserDTO } from 'milim-server/src/@types/dtos';

const Profile: React.FC = () => {
  const { user, isLoading }: {user: UserDTO, isLoading: boolean} = useUser();
  if (isLoading)
    return <Loader />;

  return (
    <div className="profile-container">
      <AnimalIcon iconWidth={230} path={ user.spiritAnimal } />
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
