import User from '../User/User';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <User />
    </header>
  );
}

export default Header;
