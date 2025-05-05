import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameProps } from '../../../../constants/games';
import './GameCard.scss';

const GameCard = ({ name, image, path }: GameProps) => {
  const navigate = useNavigate();

  return (
    <div className="game-card-container">
      <button className="game-card-button" onClick={() => navigate(path)}>
        <p className="game-card-title">{name}</p>
        <img className="game-card-image" src={image} alt={name} />
      </button>
    </div>
  );
};

export default GameCard;
