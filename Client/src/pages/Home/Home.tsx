import React from 'react';
import { Link } from 'react-router-dom';
import { ObjectsCategoriesRoutesValues } from '../../constants/routes';
import { trpc } from '../../utils/trpc';

// רשימת קטגוריות לדוגמה
const categories = [
  { name: 'AIRPORT', icon: '/assets/images/categories/airport.png', path: ObjectsCategoriesRoutesValues.AIRPORT },
  { name: 'SCHOOL', icon: '/assets/images/categories/school.png', path: ObjectsCategoriesRoutesValues.SCHOOL },
  { name: 'PARK', icon: '/assets/images/categories/park.png', path: ObjectsCategoriesRoutesValues.PARK },
  { name: 'KITCHEN', icon: '/assets/images/categories/kitchen.png', path: ObjectsCategoriesRoutesValues.KITCHEN },
  { name: 'BEDROOM', icon: '/assets/images/categories/bedroom.png', path: ObjectsCategoriesRoutesValues.BEDROOM },
  { name: 'SUPERMARKET', icon: '/assets/images/categories/supermarket.png', path: ObjectsCategoriesRoutesValues.SUPERMARKET },
  { name: 'LIVING ROOM', icon: '/assets/images/categories/living_room.png', path: ObjectsCategoriesRoutesValues.LIVING_ROOM },
  { name: '', icon: '/assets/images/categories/add.jpg', path: ObjectsCategoriesRoutesValues.ADD },
];

const Home: React.FC = () => {
  // const userDetails = useUserDetails();
  const { data: helloWorld } = trpc.hello.world.useQuery({ userName: 'John' });

  const userDetails = {
    username: 'John Doe',
    spiritAnimal: '/assets/images/animals/giraffe.svg',
  };

  return (
    <div className="flex flex-col flex-grow bg-[#FBF3DF] px-4 pt-10">
      {userDetails && (
        <div className="flex flex-col items-start">
          <img
            src={userDetails.spiritAnimal || '/assets/images/animals/giraffe.svg'}
            className="w-32 h-32 rounded-full"
          />
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
            className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={category.icon}
              alt={category.name}
              className="w-19 h-19"
            />
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
