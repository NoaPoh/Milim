import React from 'react';
import { Link } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import { RoutesValues } from '../../routes/routes';
import './Navbar.scss';

const Navbar = () => {
  return (
    //bottom navigation bar
    <nav className="navbar">
      <Link to={RoutesValues.HOME} className="navbar__link">
        <HomeIcon />
      </Link>
      <Link to={RoutesValues.GAMES} className="navbar__link">
        <SportsEsportsIcon />
      </Link>
      <Link to={RoutesValues.CAMERA} className="navbar__link">
        <PhotoCameraIcon />
      </Link>
      <Link
        to={RoutesValues.PROFILE}
        className="navbar__link navbar__link--spaced"
      >
        <PersonIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
