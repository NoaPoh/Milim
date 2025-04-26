import React, { useState } from 'react';
import './Profile.scss';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string>('Sheleg');

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
