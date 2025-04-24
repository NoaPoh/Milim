import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full flex justify-around p-3 border-t border-gray-300">
      <Link to="/games" className="text-gray-900">
        <img src="/assets/images/icons/gameboy-icon.svg" />
      </Link>
      <Link to="/" className="text-gray-900">
        <img src="/assets/images/icons/home-icon.svg" />
      </Link>
      <Link to="/camera" className="text-gray-900">
        <img src="/assets/images/icons/camera-icon.svg" />
      </Link>
      <Link to="/profile" className="mx-2">
        <img src="/assets/images/icons/profile-icon.svg" />
      </Link>
    </nav>
  );
};

export default Navbar;
