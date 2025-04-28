import React from 'react';
import { Link } from 'react-router-dom';
import giraffeIcon from '../../assets/images/animals/giraffe.png';
import './Home.scss';
import { RoutesValues } from '../../routes/routes';
import { useGetCategories } from './hooks/useGetCategories';

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
            <Link
              to={`${RoutesValues.CATEGORIES}/${category.name}`}
              key={category.id}
              className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={category.picture}
                alt={category.name}
                className="w-19 h-19 category-icon"
              />
              <span className="mt-2 text-lg font-semibold text-gray-700">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
