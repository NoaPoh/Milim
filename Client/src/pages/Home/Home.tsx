import React, { useEffect } from 'react';
import giraffeIcon from '../../assets/images/animals/giraffe.png';
import './Home.scss';
import { useGetCategories } from './hooks/useGetCategories';
import { CategoryCard } from './components/CategoryCard';
import addIcon from '../../assets/images/categories/add.png';
import { Link } from 'react-router-dom';
import { RoutesValues } from '../../routes/routes';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import Loader from '../../components/Loader/Loader';
import { useUser } from '../../context/UserContext';

const Home: React.FC = () => {
  // const userDetails = useUserDetails();

  const { data: categories, isLoading } = useGetCategories();

  const { user } = useUser();
  return (
    <div className="home__container">
      {user && (
        <div className="home__user-details">
          <AnimalIcon iconWidth={140} path={user.spiritAnimal}></AnimalIcon>
          <p className="text-xl text-gray-700 mb-6">
            Hello {user.username}, <br /> Where are you now?
          </p>
        </div>
      )}
      {isLoading && <Loader />}

      {categories && (
        <div className="home__category-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              picture={category.picture}
            />
          ))}
          <div key={0} className="category__word">
            <Link to={RoutesValues.ADD_CATEGORY}>
              <img
                src={addIcon}
                alt="Add new category"
                className="add-icon object-cover"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
