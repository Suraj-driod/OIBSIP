import { TaskItem } from './TaskItem';

export const TaskList = ({ title, tasks, emptyMessage }) => {
  return (
    <div className="task-list">
      <h2 className="list-title">
        {title}
        <span className="task-count">{tasks.length}</span>
      </h2>
      
      {tasks.length === 0 ? (
        <p className="empty-message">{emptyMessage}</p>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
