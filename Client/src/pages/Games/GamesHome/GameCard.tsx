import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { gamesProps } from '../../../constants/games';

const GameCard = ({ name, image, path }: gamesProps) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <button
        style={{
          height: '120px',
          width: '230px',
          backgroundColor: '#E7E7E7',
          borderRadius: '20px',
          position: 'relative',
        }}
        onClick={() => {
          navigate(path);
        }}
      >
        <p style={{ fontSize: '20px' }}>{name}</p>
        <img
          style={{
            height: '60px',
            position: 'absolute',
            transform: 'translateX(-75%) translateY(-65%)',
          }}
          src={image}
          alt={name}
        />
      </button>
    </div>
  );
};

export default GameCard;
