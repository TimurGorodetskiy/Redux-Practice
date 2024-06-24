import { createSlice } from '@reduxjs/toolkit';

const loadTaskFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState = {
  tasks: loadTaskFromLocalStorage(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
        isEditing: false,
      });
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    toggleTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      saveTasksToLocalStorage(state.tasks);
    },
    editTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isEditing = !task.isEditing;
      }
      saveTasksToLocalStorage(state.tasks);
    },

    updateTask(state, action) {
      const { id, text } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.text = text;
        task.isEditing = false;
      }
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const { addTask, deleteTask, toggleTask, editTask, updateTask } =
  todoSlice.actions;

export default todoSlice.reducer;
