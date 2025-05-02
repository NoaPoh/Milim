import { GamesRoutesValues } from './routes';
import crosswordIcon from '../assets/images/games/crossword.png';
import flashcardsIcon from '../assets/images/games/flashcards.png';
import spellingIcon from '../assets/images/games/spelling.png';

interface gamesProps {
  name: string;
  path: GamesRoutesValues;
  image: string;
}

export const games: gamesProps[] = [
  {
    name: 'crossword',
    path: GamesRoutesValues.CROSSWORD,
    image: crosswordIcon,
  },
  {
    name: 'flashcards',
    path: GamesRoutesValues.FLASH_CARDS,
    image: flashcardsIcon,
  },
  {
    name: 'spelling',
    path: GamesRoutesValues.SPELLING,
    image: spellingIcon,
  },
];
