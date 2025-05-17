import React from 'react';
import giraffeIcon from '../../assets/images/animals/giraffe.png';
import './Home.scss';
import { useGetCategories } from './hooks/useGetCategories';
import { CategoryCard } from './components/CategoryCard';
import addIcon from '../../assets/images/categories/add.jpg';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import Loader from '../../components/Loader/Loader';
import { useUser } from '../../context/UserContext';

const Home: React.FC = () => {
  // const userDetails = useUserDetails();

  const { data: categories, isLoading } = useGetCategories();

  const { user } = useUser();
  return (
    <div className="flex flex-col flex-grow bg-[#FBF3DF] px-4 pt-10">
      {user && (
        <div className="user-section">
          <AnimalIcon iconWidth={120} path={user.spiritAnimal}></AnimalIcon>
          <p className="text-xl text-gray-700 mb-6">
            Hello {user.username}, <br /> Where are you now?
          </p>
        </div>
      )}
      {isLoading && <Loader />}

      {/* Category Grid */}
      {categories && (
        <div className="grid grid-cols-2 gap-6 w-full max-w-md items-center flex-grow">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              picture={category.picture}
            />
          ))}
          <CategoryCard name="add" picture={addIcon} />
        </div>
      )}
    </div>
  );
};

export default Home;
