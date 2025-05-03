import React, { useState } from 'react';
import './Profile.scss';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';

const Profile: React.FC = () => {
  const { user, isLoading }: {user: UserDTO, isLoading: boolean} = useUser();
  if (isLoading)
    return <Loader />;

  return (
    <div>
      <AnimalIcon path="/assets/images/giraffe.svg" />
      <p className="text-xl text-gray-700 mb-6">
        Happy to see you back, {username}
      </p>
    </div>
  );
};


export default Profile;
