import { useEffect, useState } from 'react';
import { getTasks } from '../../services/api';
import type { ITask } from '../../models/ITask';
import Task from '../Task/Task';
import styles from './TasksList.module.scss';

interface TasksListProps {
  filter: 'all' | 'my';
  user?: string | null;
}

function TasksList({ filter, user }: TasksListProps) {
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

  

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'my' && user) {
      return task.author === user;
    }
    return true;
  });

  return (
    <div className={styles.tasks}>
      {isLoading ? (
        <div>Загрузка задач...</div>
      ) : filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <div>Нет задач для отображения</div>
      )}
    </div>
  );
}

export default TasksList;
