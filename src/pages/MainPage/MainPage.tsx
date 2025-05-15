import TasksList from '../../components/TasksList/TasksList';
import styles from './MainPage.module.scss';
import plusIcon from '../../assets/icons/plusIcon.svg';
import IconButton from '../../components/IconButton/IconButton';

function MainPage() {

  return (
    <main className={styles.main}>
     
      <div className={styles.main__top}>
        <h2 className={styles.main__title}>Список задач</h2>
        <IconButton
          className={styles.main__btnAdd}
          icon={plusIcon}
          alt="plus"
        />
      </div>
      <TasksList />
    </main>
  );
}

export default MainPage;
