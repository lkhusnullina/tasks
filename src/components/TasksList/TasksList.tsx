import { useEffect, useState } from 'react';
import { getTasks } from '../../services/api';
import type { ITask } from '../../models/iTask';
import Task from '../Task/Task';
import styles from './TasksList.module.scss'

function TasksList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className={styles.tasks}>
      {isLoading ? (
        <div>Загрузка задач...</div>
      ) : (
        tasks.map((task) => <Task key={task.id} task={task} />)
      )}
    </div>
  );
}

export default TasksList;
