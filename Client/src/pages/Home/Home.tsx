import React from 'react';
import giraffeIcon from '../../assets/images/animals/giraffe.png';
import './Home.scss';
import { useGetCategories } from './hooks/useGetCategories';
import { CategoryCard } from './components/CategoryCard';
import addIcon from '../../assets/images/categories/add.jpg';

const Home: React.FC = () => {
  // const userDetails = useUserDetails();

  const { data: categories } = useGetCategories();

  const userDetails = {
    username: 'John Doe',
    spiritAnimal: giraffeIcon,
  };

  return (
    <div className="flex flex-col flex-grow bg-[#FBF3DF] px-4 pt-10">
      {userDetails && (
        <div className="flex flex-col items-start">
          <img
            src={userDetails.spiritAnimal}
            className="w-32 h-32 rounded-full"
          />
          <p className="text-xl text-gray-700 mb-6">
            Hello {userDetails.username}, <br /> Where are you now?
          </p>
        </div>
      )}

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
