import TasksList from '../../components/TasksList/TasksList';
import styles from './MainPage.module.scss';
import plusIcon from '../../assets/icons/plusIcon.svg';
import IconButton from '../../components/IconButton/IconButton';
import TaskFilter from '../../components/TaskFilter/TaskFilter';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

function MainPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") === 'my' ? 'my' : 'all'
  const [filter, setFilter] = useState<'all' | 'my'>(initialFilter);

  useEffect(() => {
    setSearchParams({filter})
  }, [filter,setSearchParams])

  return (
    <main className={styles.main}>
      <div className={styles.main__top}>
        <h2 className={styles.main__title}>Список задач</h2>
        <div className={styles.main__btnBlock}>
          <TaskFilter filter={filter} onChange={setFilter}/>
          <IconButton
            className={styles.main__btnAdd}
            icon={plusIcon}
            alt="plus"
          />
        </div>
      </div>
      <TasksList filter={filter} user={user}/>
    </main>
  );
}

export default MainPage;
