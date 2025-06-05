import { GamesRoutes } from '../routes/routes';
import crosswordIcon from '../assets/images/games/crossword.png';
import flashcardsIcon from '../assets/images/games/flashcards.png';
import spellingIcon from '../assets/images/games/spelling.png';

export interface GameProps {
  name: string;
  path: GamesRoutes;
  image: string;
}

export enum GameNames {
  CROSSWORD = 'תפזורת',
  FLASH_CARDS = 'כרטיסיות',
  SPELLING = 'איות',
}

export const games: GameProps[] = [
  {
    name: GameNames.CROSSWORD,
    path: GamesRoutes.CROSSWORD,
    image: crosswordIcon,
  },
  {
    name: GameNames.FLASH_CARDS,
    path: GamesRoutes.FLASH_CARDS,
    image: flashcardsIcon,
  },
  {
    name: GameNames.SPELLING,
    path: GamesRoutes.SPELLING,
    image: spellingIcon,
  },
];
