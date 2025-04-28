import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { RoutesValues } from './constants/routes';
import Profile from './pages/Profile/Profile';
import './App.scss';
import Router from './routes/router';

const App = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== RoutesValues.REGISTER &&
    location.pathname !== RoutesValues.LOGIN;

  return (
    <div className="app">
      <Router />
      {showNavbar && <Navbar />}
    </div>
  );
};

export default App;
