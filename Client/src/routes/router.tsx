import React from 'react';
import { FunctionComponent } from 'react';
import { GamesRoutes, RoutesValues } from './routes';
import Home from '../pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import CameraPage from '../pages/Camera/Camera';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import GamesHome from '../pages/Games/GamesHome/GamesHome';
import Crossword from '../pages/Games/Crossword/Crossword';
import FlashCards from '../pages/Games/FlashCards/FlashCards';
import Spelling from '../pages/Games/Spelling/Spelling';
import WelcomeToGame from '../pages/Games/WelcomeScreen/WelcomeToGame';
import Profile from '../pages/Profile/Profile';
import Category from '../pages/Category/Category';
import GenericGame from '../pages/Games/GenericGame';
import Navbar from '../components/Navabr/Navbar';

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-w-navbar">
      <Navbar />
      {children}
    </div>
  );
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
    component: <CameraPage />,
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
    path: GamesRoutes.CROSSWORD,
    component: <GenericGame GameComponent={Crossword} />,
    navbar: false,
  },
  {
    path: GamesRoutes.FLASH_CARDS,
    component: <GenericGame GameComponent={FlashCards} />,
    navbar: false,
  },
  {
    path: GamesRoutes.SPELLING,
    component: <GenericGame GameComponent={Spelling} />,
    navbar: false,
  },
  {
    path: RoutesValues.GAME_WELCOME_SCREEN,
    component: <WelcomeToGame />,
    navbar: false,
  },
  {
    path: RoutesValues.PROFILE,
    component: <Profile />,
    navbar: true,
  },
  {
    path: `${RoutesValues.CATEGORY}/:id`, // Add dynamic segment for category ID
    component: <Category />,
    navbar: true,
  },
];

interface RouterProps {}

const Router: FunctionComponent<RouterProps> = () => {
  return (
    <Routes>
      {routes.map((route) => {
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
