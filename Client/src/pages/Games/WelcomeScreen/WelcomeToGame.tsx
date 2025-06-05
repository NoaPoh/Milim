import React, { useEffect, useMemo } from 'react';
import './WelcomeToGame.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { games } from '../../../constants/games'; // Update the path as needed

const WelcomeToGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { path } = location.state || {};

  const game = useMemo(() => games.find((g) => g.path === path), [path]);

  useEffect(() => {
    if (!path || !game) {
      navigate(-1);
    }
  }, [path, game, navigate]);

  if (!game) return null;

  return (
    <div className="welcome-screen">
      <p className="text">ברוך הבא אל</p>
      <p className="text__game-name">{game.name}</p>
      <img src={game.image} alt={game.name} />
      <button className="button" onClick={() => navigate(path)}>
        בואו נתחיל!
      </button>
    </div>
  );
};

export default WelcomeToGame;
