import React from "react";
import { Link } from "react-router-dom";

// רשימת קטגוריות לדוגמה
const categories = [
    { name: "AIRPORT", icon: "✈️", path: "/categories/airport" },
    { name: "SCHOOL", icon: "🏫", path: "/categories/school" },
    { name: "FOOD", icon: "🍎", path: "/categories/foods" },
    { name: "GARDEN", icon: "🌱", path: "/categories/garden" },
    { name: "BEDROOM", icon: "🛏️", path: "/categories/bedroom" },
];

const Home: React.FC = () => {
    // const userDetails = useUserDetails();

    const userDetails = {
        username: "John Doe",
        spiritAnimal: "/assets/images/giraffe.svg",
    };

    return (
        <div className="flex flex-col flex-grow bg-[#FBF3DF] px-4 pt-10">
            {/* User Greeting */}
            {userDetails && (
                <div className="flex flex-col items-start">
                    <img src={userDetails.spiritAnimal || "/assets/images/giraffe.svg"}
                         className="w-32 h-32 rounded-full"/>
                    <p className="text-xl text-gray-700 mb-6">
                        Hello {userDetails.username}, <br/> Where are you now?
                    </p>
                </div>
            )}

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-md items-center flex-grow">
                {categories.map((category) => (
                    <Link to={category.path} key={category.name}
                          className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                        <span className="text-5xl">{category.icon}</span>
                        <span className="mt-2 text-lg font-semibold text-gray-700">{category.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;