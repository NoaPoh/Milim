import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navabr/Navbar';
import './App.scss';
import Router from './routes/router';
import { RoutesValues } from './routes/routes';

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
