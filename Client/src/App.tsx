import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navabr/Navbar';
import './App.scss';
import Router from './routes/router';
import { RoutesValues } from './routes/routes';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loader from './components/Loader/Loader';

const App = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== RoutesValues.REGISTER &&
    location.pathname !== RoutesValues.LOGIN;

  const howManyFetching = useIsFetching();
  const howManyMutating = useIsMutating();

  return (
    <div className="app">
      {howManyFetching + howManyMutating > 0 && <Loader />}
      <Router />
      {showNavbar && <Navbar />}
    </div>
  );
};

export default App;
