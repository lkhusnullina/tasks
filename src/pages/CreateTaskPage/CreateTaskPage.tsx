import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import type { ITask } from '../../models/ITask';
import Button from '../../components/Button/Button';
import styles from './CreateTaskPage.module.scss';
import { createTask } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function CreateTaskPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Пользователь не авторизован');
      return;
    }

    const newTask: ITask = {
      title,
      description,
      isCompleted,
      author: user,
      id: 0,
    };

    try {
      await createTask(newTask);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      setError('Ошибка при создании задачи');
    }
  };

  return (
    <>
      <Button className={styles.create__btnPrev} onClick={() => navigate(-1)}>
        Назад
      </Button>
      <div className={styles.create}>
        <div className={styles.create__container}>
          <h2 className={styles.create__title}>Создание задачи </h2>
          {error && <p className={styles.create__error}>{error}</p>}
          <form className={styles.create__form} onSubmit={handleSubmit}>
            <div className={styles.create__formGroup}>
              <label className={styles.create__label}>Название</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={styles.create__input}
              />
            </div>

            <div className={styles.create__formGroup}>
              <label className={styles.create__label}>Описание</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={styles.create__input}
              />
            </div>
            <div className={styles.create__formGroup}>
              <label className={styles.create__label}>
                Выполнено:
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                />
              </label>
            </div>
            <Button className={styles.create__button}>Создать</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTaskPage;
