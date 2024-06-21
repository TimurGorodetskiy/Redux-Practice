import React, { useState } from 'react';

export function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value.trim());
    }

    setValue('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='TodoForm'>
        <input
          className='todo-input'
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='What is the task today?'
        />
        <button className='todo-btn' type='submit'>
          Add task
        </button>
      </form>
    </>
  );
}
