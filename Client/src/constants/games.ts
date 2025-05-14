import { GamesRoutesValues } from '../routes/routes';
import crosswordIcon from '../assets/images/games/crossword.png';
import flashcardsIcon from '../assets/images/games/flashcards.png';
import spellingIcon from '../assets/images/games/spelling.png';

export interface GameProps {
  name: string;
  path: GamesRoutesValues;
  image: string;
}

export const games: GameProps[] = [
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
