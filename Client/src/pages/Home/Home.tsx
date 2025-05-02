import React from 'react';
import { Link } from 'react-router-dom';
import { ObjectsCategoriesRoutesValues } from '../../constants/routes';
import { trpc } from '../../utils/trpc';
import airportIcon from '../../assets/images/categories/airport.png';
import schoolIcon from '../../assets/images/categories/school.png';
import parkIcon from '../../assets/images/categories/park.png';
import kitchenIcon from '../../assets/images/categories/kitchen.png';
import bedroomIcon from '../../assets/images/categories/bedroom.png';
import supermarketIcon from '../../assets/images/categories/supermarket.png';
import livingRoomIcon from '../../assets/images/categories/living_room.png';
import addIcon from '../../assets/images/categories/add.jpg';
import giraffeIcon from '../../assets/images/animals/giraffe.png';
import './Home.scss';

// רשימת קטגוריות לדוגמה
const categories = [
  {
    name: 'AIRPORT',
    icon: airportIcon,
    path: ObjectsCategoriesRoutesValues.AIRPORT,
  },
  {
    name: 'SCHOOL',
    icon: schoolIcon,
    path: ObjectsCategoriesRoutesValues.SCHOOL,
  },
  { name: 'PARK', icon: parkIcon, path: ObjectsCategoriesRoutesValues.PARK },
  {
    name: 'KITCHEN',
    icon: kitchenIcon,
    path: ObjectsCategoriesRoutesValues.KITCHEN,
  },
  {
    name: 'BEDROOM',
    icon: bedroomIcon,
    path: ObjectsCategoriesRoutesValues.BEDROOM,
  },
  {
    name: 'SUPERMARKET',
    icon: supermarketIcon,
    path: ObjectsCategoriesRoutesValues.SUPERMARKET,
  },
  {
    name: 'LIVING ROOM',
    icon: livingRoomIcon,
    path: ObjectsCategoriesRoutesValues.LIVING_ROOM,
  },
  { name: '', icon: addIcon, path: ObjectsCategoriesRoutesValues.ADD },
];

const Home: React.FC = () => {
  // const userDetails = useUserDetails();
  const { data: helloWorld } = trpc.hello.world.useQuery();

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
              className="w-19 h-19 category-icon"
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
