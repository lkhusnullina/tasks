import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTaskById } from '../../services/api';
import type { ITask } from '../../models/iTask';
import Button from '../../components/Button/Button';
import styles from './TaskPage.module.scss';

function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      setIsLoading(true);
      if (!id) return;
      try {
        const task = await getTaskById(Number(id));
        setTask(task);
      } catch (error) {
        console.error('Ошибка загрузки задачи:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTask();
  }, [id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!task) return <div>Задача не найдена</div>;
  return (
    <div className={styles.taskPage}>
      <div className={styles.taskPage__top}>
        <Button className={styles.taskPage__btnPrev} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <h2>{task.title}</h2>
      </div>
      <div className={styles.taskPage__content}>
        <div>Описание: {task.description}</div>
        <div> Статус: {task.isCompleted ? 'Выполнена' : 'Не выполнена'}</div>
        <div> Автор: </div>
      </div>
    </div>
  );
}

export default TaskPage;
