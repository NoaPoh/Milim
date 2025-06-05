import React from 'react';
import GameCard from '../components/GameCard/GameCard';
import { games } from '../../../constants/games';
import './GamesHome.scss';

const GamesHome: React.FC = () => {
  return (
    <div className="games-home">
      {games.map((game) => (
        <GameCard
          key={game.name}
          name={game.name}
          image={game.image}
          path={game.path}
          nameToShow={game.nameToShow}
        />
      ))}
    </div>
  );
};

export default GamesHome;
