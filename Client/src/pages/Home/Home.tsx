import React from 'react';
import { Link } from 'react-router-dom';
import { ObjectsCategoriesRoutesValues } from '../../constants/routes';
import { trpc } from '../../utils/trpc';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';

// רשימת קטגוריות לדוגמה
const categories = [
  { name: 'AIRPORT', icon: '✈️', path: ObjectsCategoriesRoutesValues.AIRPORT },
  { name: 'SCHOOL', icon: '🏫', path: ObjectsCategoriesRoutesValues.SCHOOL },
  { name: 'FOOD', icon: '🍎', path: ObjectsCategoriesRoutesValues.FOOD },
  { name: 'GARDEN', icon: '🌱', path: ObjectsCategoriesRoutesValues.GARDEN },
  { name: 'BEDROOM', icon: '🛏️', path: ObjectsCategoriesRoutesValues.BEDROOM },
];

const Home: React.FC = () => {
  // const userDetails = useUserDetails();
  const { data: helloWorld } = trpc.hello.world.useQuery();

  const userDetails = {
    username: 'John Doe',
    spiritAnimal: '/assets/images/giraffe.svg',
  };

  return (
    <div className="flex flex-col flex-grow bg-[#FBF3DF] px-4 pt-10">
      {userDetails && (
        <div className="flex flex-col items-start">
          <AnimalIcon path=""></AnimalIcon>
          <p className="text-xl text-gray-700 mb-6">
            Hello {userDetails.username}, <br /> Where are you now?
          </p>
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-md items-center flex-grow">
        {categories.map((category) => (
          <Link
            to={category.path}
            key={category.name}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <span className="text-5xl">{category.icon}</span>
            <span className="mt-2 text-lg font-semibold text-gray-700">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
