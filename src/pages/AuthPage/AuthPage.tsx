import { useState } from 'react';
import styles from './AuthPage.module.scss';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('love@example.com');
  const [password, setPassword] = useState('11211121');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (e) {
      console.error(e);
      alert('Неверные данные');
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <h2 className={styles.auth__title}>Вход</h2>
        <form className={styles.auth__form} onSubmit={handleLogin}>
          <div className={styles.auth__formGroup}>
            <label htmlFor="email" className={styles.auth__label}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.auth__input}
            />
          </div>

          <div className={styles.auth__formGroup}>
            <label htmlFor="password" className={styles.auth__label}>
              Пароль:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.auth__input}
            />
          </div>

          <Button className={styles.auth__button}>Войти</Button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
