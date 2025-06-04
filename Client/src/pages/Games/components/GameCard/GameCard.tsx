import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameProps } from '../../../../constants/games';
import './GameCard.scss';
import { RoutesValues } from '../../../../routes/routes';

const GameCard = ({ name, image, path }: GameProps) => {
  const navigate = useNavigate();

  return (
    <button
      className="game-card-button"
      onClick={() =>
        navigate(RoutesValues.GAME_WELCOME_SCREEN, {
          state: { path: path, name: name, image: image },
        })
      }
    >
      <p className="game-card-title">{name}</p>
      <img className="game-card-image" src={image} alt={name} />
    </button>
  );
};

export default GameCard;
