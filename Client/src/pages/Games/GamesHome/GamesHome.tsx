import React from 'react';
import GameCard from '../components/GameCard/GameCard';
import { games } from '../../../constants/games';
import './GamesHome.scss';
import toast, { Toaster } from 'react-hot-toast';

const GamesHome: React.FC = () => {
  const notify = () =>
    toast.success(`__ added to your collection __`, {
      duration: 2000,
      style: {
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#96d4b5',
        secondary: '#FFFAEE',
      },
    });
  notify();

  console.log(games);

  return (
    <div className="games-home">
      <Toaster position="top-center" reverseOrder={false} />

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
