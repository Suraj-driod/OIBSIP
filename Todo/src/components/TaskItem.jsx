import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toggleTask, editTask, deleteTask } = useTodo();

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      editTask(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <button 
          className={`checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => toggleTask(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
            {task.text}
          </span>
        )}
      </div>

      <div className="task-meta">
        <span className="task-date">
          {task.completed 
            ? `Done ${formatDate(task.completedAt)}`
            : `Added ${formatDate(task.createdAt)}`
          }
        </span>
        <div className="task-actions">
          <button 
            className="btn-edit" 
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button 
            className="btn-delete" 
            onClick={() => deleteTask(task.id)}
            aria-label="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
