import React from 'react';
import { FunctionComponent } from 'react';
import { GamesRoutesValues, RoutesValues } from './routes';
import Home from '../pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Camera from '../pages/Camera/Camera';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import GamesHome from '../pages/Games/GamesHome/GamesHome';
import Crossword from '../pages/Games/Crossword/Crossword';
import FlashCards from '../pages/Games/FlashCards/FlashCards';
import Spelling from '../pages/Games/Spelling/Spelling';
import WelcomeToGame from '../pages/Games/WelcomeScreen/WelcomeToGame';

const Page = ({ children }: { children: React.ReactNode }) => {
  return <div className="page-w-navbar">{children}</div>;
};

const NoNavbarPage = ({ children }: { children: React.ReactNode }) => {
  return <div className="page-wo-navbar">{children}</div>;
};

interface RouteProps {
  path: string;
  component: React.ReactNode;
  navbar: boolean;
}

const routes: RouteProps[] = [
  {
    path: RoutesValues.HOME,
    component: <Home />,
    navbar: true,
  },
  {
    path: RoutesValues.CAMERA,
    component: <Camera />,
    navbar: true,
  },
  {
    path: RoutesValues.REGISTER,
    component: <Register />,
    navbar: false,
  },
  {
    path: RoutesValues.LOGIN,
    component: <Login />,
    navbar: false,
  },
  {
    path: RoutesValues.GAMES,
    component: <GamesHome />,
    navbar: true,
  },
  {
    path: GamesRoutesValues.CROSSWORD,
    component: <Crossword />,
    navbar: false,
  },
  {
    path: GamesRoutesValues.FLASH_CARDS,
    component: <FlashCards />,
    navbar: false,
  },
  {
    path: GamesRoutesValues.SPELLING,
    component: <Spelling />,
    navbar: false,
  },
  {
    path: RoutesValues.GAME_WELCOME_SCREEN,
    component: <WelcomeToGame />,
    navbar: false,
  },
];

interface RouterProps {}

const Router: FunctionComponent<RouterProps> = (props) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const { path, component, navbar } = route;
        return (
          <Route
            key={path}
            path={path}
            element={
              navbar ? (
                <Page>{component}</Page>
              ) : (
                <NoNavbarPage>{component}</NoNavbarPage>
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default Router;
