import React, { useState } from 'react';
import { RoutesValues } from '../../routes/routes';
import { api } from '../../utils/trpcClient';
import { useNavigate } from 'react-router-dom';
import hippoPicture from '../../assets/images/animals/hippo.png';
import monkeyPicture from '../../assets/images/animals/monkey.png';
import crocodilePicture from '../../assets/images/animals/crocodile.png';
import tigerPicture from '../../assets/images/animals/tiger.png';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const navToRegister = () => {
    navigate(RoutesValues.REGISTER);
  };

  const navToHome = () => {
    console.log('Login successful');
    navigate(RoutesValues.HOME);
  };

  const { isPending: loginIsPending, mutateAsync: login } =
    api.auth.login.useMutation({
      onSuccess: navToHome,
      onError: (error) => {
        setErrorMessage(error.message || 'שם משתמש או סיסמה לא תקינים');
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error
    login({ email, password });
  };

  return (
    <div className="login-page">
      {/* Header hippos */}
      <div className="login-page__header">
        <img src={crocodilePicture} alt="Crocodile" className="left-animal" />
        <img
          src={monkeyPicture}
          alt="Monkey"
          className="animated-animal pop-off-top"
        />
      </div>

      <div className="login-page__center">
        <div className="login-box">
          <h2>Milim</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="login-error-message">{errorMessage}</p>
            )}
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={errorMessage ? 'error' : ''}
            />
            <input
              type="password"
              placeholder="סיסמה ממש חזקה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={errorMessage ? 'error' : ''}
            />

            <button type="submit" disabled={loginIsPending}>
              יאללה
            </button>
          </form>
          <p>
            אין לך חשבון עדיין? <a onClick={navToRegister}>הרשם</a>
          </p>
        </div>
      </div>

      {/* Footer hippo */}
      <div className="login-page__footer">
        <img
          src={hippoPicture}
          alt="Hippo"
          className="login-page__footer__hippo-img"
        />
        <img
          src={tigerPicture}
          alt="Tiger"
          className="login-page__footer__tiger-img"
        />
      </div>
    </div>
  );
};

export default Login;
