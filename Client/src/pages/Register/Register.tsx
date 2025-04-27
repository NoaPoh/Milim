import React, { useState } from 'react';
import './Register.scss';
import { trpc } from '../../utils/trpc';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router';
import { RoutesValues } from '../../constants/routes';
import hippoPicture from '../../assets/images/animals/hippo.png';
import zebraPicture from '../../assets/images/animals/zebra.png';
import monkeyPicture from '../../assets/images/animals/monkey.png';
import boarPicture from '../../assets/images/animals/boar.png';
import antilopePicture from '../../assets/images/animals/antilope.png';

const spiritAnimals = [
  hippoPicture,
  zebraPicture,
  monkeyPicture,
  boarPicture,
  antilopePicture,
];

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
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h2 className="register__title">Let's get to know you !</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register__input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
        />

        <select
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value)}
          className="register__input"
        >
          <option value="" disabled hidden>
            I speak
          </option>
          <option value="English">English</option>
        </select>

        <select
          onChange={(e) => setLearningLanguage(e.target.value)}
          className="register__input"
        >
          <option value="" disabled hidden>
            I want to learn
          </option>
          <option value="Spanish">Hebrew</option>
        </select>

        <label className="register__text">Pick Your Spirit Animal:</label>
        <div className="register__spirit-animals">
          {spiritAnimals.map((animal) => (
            <button
              key={animal}
              type="button"
              className="register__animals-button"
              onClick={() => setSpiritAnimal(animal)}
            >
              <img
                src={animal}
                alt="Spirit Animal"
                className="w-16 h-16 object-cover rounded-full"
              />
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
