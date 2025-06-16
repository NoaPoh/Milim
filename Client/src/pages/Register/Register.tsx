import React, { useState } from 'react';
import './Register.scss';
import { api } from '../../utils/trpcClient';
import { useNavigate } from 'react-router';
import { RoutesValues } from '../../routes/routes';
import { showSuccessToast, showErrorToast } from '../../utils/toast.ts';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spiritAnimal, setSpiritAnimal] = useState<number>(0);
  const navigate = useNavigate();

  const { data: freeAnimals } = api.award.getFreeAnimals.useQuery();

  const { mutateAsync: register, isPending: registerIsPending } =
    api.auth.register.useMutation({
      onSuccess: () => {
        showSuccessToast('הרשמה בוצעה בהצלחה!');
        navigate(RoutesValues.HOME);
      },
      onError: (error) => {
        showErrorToast(error.message || 'ההרשמה נכשלה, אנא נסו שוב.');
      },
    });
  const isSubmitDisabled =
    registerIsPending || !username || !email || !password || !spiritAnimal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitDisabled) {
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
        <h2 className="register__title">בואו נכיר!</h2>

        <input
          type="text"
          placeholder="השם הכי מגניב שלך"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register__input"
        />

        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
        />

        <input
          type="password"
          placeholder="סיסמה סופר חזקה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
                src={`/images/${animal.iconUrl}`}
                alt="Spirit Animal"
                className="w-16 h-16 object-cover rounded-full"
              />
            </button>
          ))}
        </div>

        <button
          type="submit"
          className={`submit-button`}
          disabled={isSubmitDisabled}
        >
          אפשר להתחיל ללמוד!
        </button>
      </form>
    </div>
  );
};

export default Register;
