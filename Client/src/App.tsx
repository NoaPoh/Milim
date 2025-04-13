import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Camera from './pages/Camera/Camera';
import { RoutesValues } from './consts/routes';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== RoutesValues.REGISTER &&
        location.pathname !== RoutesValues.LOGIN && <Navbar />}
      <Routes>
        <Route path={RoutesValues.HOME} element={<Home />} />
        <Route path={RoutesValues.REGISTER} element={<Register />} />
        <Route path={RoutesValues.LOGIN} element={<Login />} />
        <Route path={RoutesValues.CAMERA} element={<Camera />} />
      </Routes>
    </div>
  );
};

export default App;
