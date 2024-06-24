import { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  updateTask,
} from './redux/todoSlice';
import { text } from '@fortawesome/fontawesome-svg-core';

function App() {
  const [value, setValue] = useState('');
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (value.trim() === '') return;
    dispatch(addTask(value));
    setValue('');
  };

  const handleUpdateTask = (task, newText) => {
    dispatch(updateTask({ id: task.id, text: newText }));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  console.log(tasks);

  return (
    <>
      <div className='App'>
        <h1>REDUX TODO</h1>
        <form onSubmit={handleAddTodo}>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type='submit'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.isEditing ? (
                <input
                  type='text'
                  defaultValue={task.text}
                  onBlur={(e) => handleUpdateTask(task, e.target.value)}
                  autoFocus
                />
              ) : (
                <span className={task.completed ? 'completed' : ''}>
                  {task.text}
                </span>
              )}

              <button
                onClick={() => dispatch(deleteTask(task.id))}
                disabled={task.isEditing}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                onClick={() => dispatch(toggleTask(task.id))}
                disabled={task.isEditing}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>

              <button onClick={() => dispatch(editTask(task.id))}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
