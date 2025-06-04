import React, { useState } from 'react';
import './Register.scss';
import { api } from '../../utils/trpcClient';
import { useNavigate } from 'react-router';
import { RoutesValues } from '../../routes/routes';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spiritAnimal, setSpiritAnimal] = useState<number>(0);
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate(RoutesValues.LOGIN);
  };

  const { data: freeAnimals } = api.animal.getFreeAnimals.useQuery();

  const { mutateAsync: register, isPending: registerIsPending } =
    api.auth.register.useMutation({ onSuccess: navToLogin });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !spiritAnimal) {
      return;
    }

    register({
      username,
      email,
      password,
      animalId: spiritAnimal,
    });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h2 className="register__title">בוא.י נכיר!</h2>

        <input
          type="text"
          placeholder="השם הכי מגניב שלך"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register__input"
        />

        <input
          type="password"
          placeholder="סיסמה סופר חזקה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
        />

        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
        />

        <label className="register__text">בחר.י את החיה שלך:</label>
        <div className="register__spirit-animals">
          {freeAnimals?.map((animal) => (
            <button
              key={animal.id}
              type="button"
              className="register__animals-button"
              onClick={() => setSpiritAnimal(animal.id)}
            >
              <img
                src={`src/assets/images/animals/${animal.imagePath}`}
                alt="Spirit Animal"
                className="w-16 h-16 object-cover rounded-full"
              />
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={registerIsPending}
        >
          {!registerIsPending ? 'בואו נתחיל ללמוד!' : ''}
        </button>
      </form>
    </div>
  );
};

export default Register;
