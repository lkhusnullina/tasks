import type { ITask } from '../../models/ITask';
import eyeIcon from '../../assets/icons/eyeIcon.svg';
import editIcon from '../../assets/icons/editIcon.svg';
import deleteIcon from '../../assets/icons/deleteIcon.svg';
import styles from './Task.module.scss';
import IconButton from '../IconButton/IconButton';
import { Link } from 'react-router-dom';
import { deleteTask } from '../../services/api';

interface TaskProps {
  task: ITask;
  onTaskDelete: (taskId: number) => void;
}

function Task({ task, onTaskDelete }: TaskProps) {
  const handleDeleteTask = async (taskId: number) => {
    try {
      if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
        return;
      }
      await deleteTask(taskId);
      onTaskDelete(taskId);
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <div className={styles.task}>
      <div className={styles.task__info}>
        <input
          className={styles.task__checkbox}
          type="checkbox"
          checked={task.isCompleted}
          readOnly
        />
        <h3 className={styles.task__title}>{task.title}</h3>
      </div>

      <div className={styles.task__icons}>
        <Link to={`/tasks/${task.id}`}>
          <IconButton
            className={styles.task__iconBtn}
            icon={eyeIcon}
            alt="Просмотр"
          />
        </Link>
        <Link to={`/tasks/${task.id}/edit`}>
          <IconButton
            className={styles.task__iconBtn}
            icon={editIcon}
            alt="Редактирование"
          />
        </Link>
        <IconButton
          className={styles.task__iconBtn}
          icon={deleteIcon}
          alt="Удаление"
          onClick={() => handleDeleteTask(task.id)}
        />
      </div>
    </div>
  );
}

export default Task;
