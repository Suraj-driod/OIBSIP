import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export const TaskForm = () => {
  const [text, setText] = useState('');
  const { addTask } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
