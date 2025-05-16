import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import styles from './User.module.scss';

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.user}>
      <span className={styles.user__title}>{user}</span>
      <Button className={styles.user__btnLogout} onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
}

export default User;
