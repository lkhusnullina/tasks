import { useState } from 'react';
import Button from '../Button/Button';
import styles from './TaskFilter.module.scss';

interface FilterProps {
  filter: 'all' | 'my';
  onChange: (newFilter: 'all' | 'my') => void;
}

function TaskFilter({ filter, onChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFilter = (value: 'all' | 'my') => {
    onChange(value);
    setIsOpen(false);
  };
  return (
    <div className={styles.filter}>
      <Button className={styles.filter__btnFilter} onClick={toggle}>
        {filter === 'all' ? 'Общие задачи' : 'Мои задачи'}
        <span>{isOpen ? '▲' : '▼'}</span>
      </Button>

      {isOpen && (
        <div className={styles.dropdown}>
          <Button
            className={styles.dropdown__btn}
            onClick={() => handleFilter('all')}
          >
            Общие задачи
          </Button>
          <Button
            className={styles.dropdown__btn}
            onClick={() => handleFilter('my')}
          >
            Мои задачи
          </Button>
        </div>
      )}
    </div>
  );
}

export default TaskFilter;
