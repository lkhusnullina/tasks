import type { ITask } from '../../models/iTask';
import eyeIcon from '../../assets/icons/eyeIcon.svg';
import editIcon from '../../assets/icons/editIcon.svg';
import deleteIcon from '../../assets/icons/deleteIcon.svg';
import styles from './Task.module.scss';
import IconButton from '../IconButton/IconButton';

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
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
        <IconButton
          className={styles.task__iconBtn}
          icon={eyeIcon}
          alt="eyeIcon"
        />
        <IconButton
          className={styles.task__iconBtn}
          icon={editIcon}
          alt="editIcon"
        />
        <IconButton
          className={styles.task__iconBtn}
          icon={deleteIcon}
          alt="deleteIcon"
        />
      </div>
    </div>
  );
}

export default Task;
