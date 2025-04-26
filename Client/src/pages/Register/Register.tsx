import React, { useState } from 'react';
import './Register.scss';
import { trpc } from '../../utils/trpc';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router';
import { RoutesValues } from '../../constants/routes';

const spiritAnimals = ['🐻', '🦊', '🐸', '🦉', '🐬'];

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [learningLanguage, setLearningLanguage] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [spiritAnimal, setSpiritAnimal] = useState(spiritAnimals[0]);
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate(RoutesValues.LOGIN);
  };

  const { mutateAsync: register, isPending: registerIsPending } =
    trpc.auth.register.useMutation({ onSuccess: navToLogin });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register({
      username,
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 shadow-lg w-96"
      >
        <h2 className="text-4xl font-bold text-center text-gray-700">
          Let's get to know you !
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value)}
          className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled hidden>
            I speak
          </option>
          <option value="English">English</option>
        </select>

        <select
          onChange={(e) => setLearningLanguage(e.target.value)}
          className="p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled hidden>
            I want to learn
          </option>
          <option value="Spanish">Hebrew</option>
        </select>

        <label className="text-gray-700 font-medium text-lg">
          Pick Your Spirit Animal:
        </label>
        <div className="flex justify-center gap-3">
          {spiritAnimals.map((animal) => (
            <button
              key={animal}
              type="button"
              className={`p-3 text-2xl border rounded-md transition-all ${
                spiritAnimal === animal
                  ? 'bg-blue-400 text-white scale-110'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSpiritAnimal(animal)}
            >
              {animal}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full hover:from-blue-400 hover:to-purple-500 hover:shadow-lg transition-all font-semibold bg-gradient-to-r from-blue-200 to-purple-300"
          disabled={registerIsPending}
        >
          {registerIsPending ? <Loader /> : "Let's do it!"}
        </button>
      </form>
    </div>
  );
};

export default Register;
