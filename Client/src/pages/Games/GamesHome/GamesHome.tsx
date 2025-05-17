import React from 'react';
import GameCard from '../components/GameCard/GameCard';
import { games } from '../../../constants/games';
import './GamesHome.scss';
import toast, { Toaster } from 'react-hot-toast';

const GamesHome: React.FC = () => {
  return (
    <div className="games-home">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

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
