import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { ITask } from '../../models/ITask';
import Button from '../../components/Button/Button';
import styles from './EditTaskPage.module.scss';
import { editTask, getTaskById } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Preloader from '../../components/Preloader/Preloader';

function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState<ITask | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      setIsLoading(true);
      if (!id) return;
      try {
        const fetchedTask = await getTaskById(Number(id));
        setTask(fetchedTask);
      } catch (error) {
        console.error('Ошибка загрузки задачи:', error);
        setError('Ошибка при загрузке задачи');
      } finally {
        setIsLoading(false);
      }
    };
    loadTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !task) {
      setError('Пользователь не авторизован');
      return;
    }

    try {
      await editTask(task.id, {
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        author: user,
      });
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      setError('Ошибка при создании задачи');
    }
  };
  if (isLoading) return <Preloader />;
  if (!task) return <p className={styles.edit__error}>Задача не найдена</p>;
  return (
    <>
      <Button className={styles.edit__btnPrev} onClick={() => navigate(-1)}>
        Назад
      </Button>
      <div className={styles.edit}>
        <div className={styles.edit__container}>
          <h2 className={styles.edit__title}>Редактирование задачи </h2>
          {error && <p className={styles.edit__error}>{error}</p>}
          <form className={styles.edit__form} onSubmit={handleSubmit}>
            <div className={styles.edit__formGroup}>
              <label className={styles.edit__label}>Название</label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
                className={styles.edit__input}
              />
            </div>

            <div className={styles.edit__formGroup}>
              <label className={styles.edit__label}>Описание</label>
              <input
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                required
                className={styles.edit__input}
              />
            </div>
            <div className={styles.edit__formGroup}>
              <label className={styles.edit__label}>
                Выполнено:
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={(e) =>
                    setTask({ ...task, isCompleted: e.target.checked })
                  }
                />
              </label>
            </div>
            <Button className={styles.edit__button}>Сохранить</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditTaskPage;
