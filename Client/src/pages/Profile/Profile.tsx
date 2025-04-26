import React, { useState } from 'react';
import { RoutesValues } from '../../constants/routes';
import { trpc } from '../../utils/trpc';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  return (
    <AnimalIcon path="/assets/images/giraffe.svg" />

  );
};

export default Profile;
