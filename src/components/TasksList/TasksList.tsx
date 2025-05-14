import { useEffect, useState } from 'react';
import { getTasks } from '../../services/api';
import type { ITask } from '../../models/iTask';

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
    <div>
      {isLoading ? (
        <div>Загрузка задач...</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <div>{task.description}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default TasksList;
