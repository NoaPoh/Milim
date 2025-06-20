import './App.scss';
import Router from './routes/router';
import GlobalLoaderInstigator from './components/GlobalLoader/GlobalLoaderInstigator';

const App = () => {
  return (
    <div className="app">
      <GlobalLoaderInstigator />
      <Router />
    </div>
  );
};

export default App;
