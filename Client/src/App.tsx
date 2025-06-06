import './App.scss';
import Router from './routes/router';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loader from './components/Loader/Loader';

const App = () => {
  const howManyFetching = useIsFetching();
  const howManyMutating = useIsMutating();

  return (
    <div className="app">
      {howManyFetching + howManyMutating > 0 && <Loader />}
      <Router />
    </div>
  );
};

export default App;
