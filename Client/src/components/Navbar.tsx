import React from 'react';
import { Link } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full flex justify-around p-3 border-t border-gray-300">
      <Link to="/games" className="text-gray-900">
        <SportsEsportsIcon />
      </Link>
      <Link to="/" className="text-gray-900">
        <HomeIcon />
      </Link>
      <Link to="/camera" className="text-gray-900">
        <PhotoCameraIcon />
      </Link>
      <Link to="/profile" className="mx-2">
        <PersonIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
