import React, { useEffect } from 'react';
import './WelcomeToGame.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const WelcomeToGame = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { path, name, image } = location.state || {};

  useEffect(() => {
    if (!path || !name || !image) {
      navigate('/');
    }
  }, [path, name, image, navigate]);

  return (
    <div className="welcome-screen">
      <p className="text">Welcome to</p>
      <p className="text__game-name">{`${name} game`}</p>
      <img src={image} alt={name} />
      <button className="button" onClick={() => navigate(path)}>
        Let's start!
      </button>
    </div>
  );
};

export default WelcomeToGame;
