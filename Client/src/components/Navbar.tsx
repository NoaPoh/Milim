import React from 'react';
import { Link } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__link">
        <HomeIcon />
      </Link>
      <Link to="/games" className="navbar__link">
        <SportsEsportsIcon />
      </Link>
      <Link to="/camera" className="navbar__link">
        <PhotoCameraIcon />
      </Link>
      <Link to="/profile" className="navbar__link navbar__link--spaced">
        <PersonIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
