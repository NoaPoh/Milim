import React from 'react';
import GameCard from './GameCard';
import { games } from '../../../constants/games';

const GamesHome: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        minHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      {games.map((game) => (
        <GameCard
          key={game.name}
          name={game.name}
          image={game.image}
          path={game.path}
        />
      ))}
    </div>
  );
};

export default GamesHome;
