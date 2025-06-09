import { api } from '../../utils/trpcClient';
import { useLocation, Link } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import { RoutesValues } from '../../routes/routes';
import './Navbar.scss';
import { showInfoToast } from '../../utils/toast';

const Navbar = () => {
  const location = useLocation();
  const { data: wordSum, isLoading } = api.word.getWordSum.useQuery();

  const handleGamesClick = (e: React.MouseEvent) => {
    if (!isLoading && wordSum !== undefined && wordSum < 5) {
      e.preventDefault();
      showInfoToast(`אוי לי! עליך להשלים לפחות 5 מילים כדי לשחק במשחקים!`);
    }
  };

  return (
    <nav className="navbar">
      <Link
        to={RoutesValues.HOME}
        className={`navbar__link ${
          location.pathname === RoutesValues.HOME ? 'active' : ''
        }`}
      >
        <HomeIcon />
      </Link>
      <Link
        to={RoutesValues.GAMES}
        onClick={handleGamesClick}
        className={`navbar__link ${
          location.pathname === RoutesValues.GAMES ? 'active' : ''
        }`}
      >
        <SportsEsportsIcon />
      </Link>
      <Link
        to={RoutesValues.CAMERA}
        className={`navbar__link ${
          location.pathname === RoutesValues.CAMERA ? 'active' : ''
        }`}
      >
        <PhotoCameraIcon />
      </Link>
      <Link
        to={RoutesValues.PROFILE}
        className={`navbar__link navbar__link--spaced ${
          location.pathname === RoutesValues.PROFILE ? 'active' : ''
        }`}
      >
        <PersonIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
