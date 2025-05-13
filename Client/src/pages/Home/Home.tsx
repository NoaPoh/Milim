import React from 'react';
import giraffeIcon from '../../assets/images/animals/giraffe.png';
import './Home.scss';
import { useGetCategories } from './hooks/useGetCategories';
import { CategoryCard } from './components/CategoryCard';
import addIcon from '../../assets/images/categories/add.png';
import { Link } from 'react-router-dom';
import { RoutesValues } from '../../routes/routes';

const Home: React.FC = () => {
  const { data: categories } = useGetCategories();

  const userDetails = {
    username: 'John Doe',
    spiritAnimal: giraffeIcon,
  };

  return (
    <div className="home__container">
      {userDetails && (
        <div className="home__user-details">
          <img
            src={userDetails.spiritAnimal}
            alt="Spirit Animal"
          />
          <p>
            Hello {userDetails.username}, <br /> Where are you now?
          </p>
        </div>
      )}

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