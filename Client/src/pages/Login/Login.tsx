import React, { useState } from 'react';
import { RoutesValues } from '../../routes/routes';
import { api } from '../../utils/trpcClient';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const navToRegister = () => {
    navigate(RoutesValues.REGISTER);
  };

  const navToHome = () => {
    console.log('Login successful');
    showSuccessToast('ברוכים השבים!');
    navigate(RoutesValues.HOME);
  };

  const { isPending: loginIsPending, mutateAsync: login } =
    api.auth.login.useMutation({
      onSuccess: navToHome,
      onError: (error) => {
        showErrorToast(error.message || 'התחברות נכשלה, אנא נסו שוב');
      },
    });

  const isSubmitNotAllowed = !email || !password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginIsPending) return;

    if (isSubmitNotAllowed) {
      showErrorToast('אנא מלאו את כל השדות לפני ההתחברות.');
      return;
    }

    login({ email, password });
  };

  return (
    <div className="login-page">
      {/* Header hippos */}
      <div className="login-page__header">
        <img
          src="/images/animals/crocodile.png"
          alt="Crocodile"
          className="left-animal"
        />
        <img
          src="/images/animals/monkey.png"
          alt="Monkey"
          className="animated-animal pop-off-top"
        />
      </div>

      <div className="login-page__center">
        <div className="login-box">
          <h2>Milim</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="סיסמה ממש חזקה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              aria-disabled={loginIsPending || isSubmitNotAllowed}
              disabled={loginIsPending}
            >
              קדימה!
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
          src="/images/animals/hippo.png"
          alt="Hippo"
          className="login-page__footer__hippo-img"
        />
        <img
          src="/images/animals/tiger.png"
          alt="Tiger"
          className="login-page__footer__tiger-img"
        />
      </div>
    </div>
  );
};

export default Login;
