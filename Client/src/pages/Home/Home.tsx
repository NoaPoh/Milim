import React from 'react';
import './Home.scss';
import { useGetCategories } from './hooks/useGetCategories';
import { CategoryCard } from './components/CategoryCard';
import addIcon from '../../assets/images/categories/add.png';
import { Link } from 'react-router-dom';
import { RoutesValues } from '../../routes/routes';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import Loader from '../../components/Loader/Loader';
import { useUser } from '../../context/UserContext';
import { AwardType } from '../../constants/awards.types.ts';

const Home: React.FC = () => {
  const { data: categories, isLoading } = useGetCategories();
  const { user } = useUser();
  const { activeAwards } = user || {};

  return (
    <div className="home__container">
      {user && (
        <div className="home__user-details">
          <AnimalIcon
            iconWidth={140}
            path={activeAwards[AwardType.PROFILE_ICON]}
            frame={activeAwards[AwardType.ICON_FRAME]}
            background={activeAwards[AwardType.ICON_BACKGROUND]}
          ></AnimalIcon>
          <p className="text-xl text-gray-700 mb-6">
            שלום {user.username}, <br /> איפה אתה עכשיו?
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
