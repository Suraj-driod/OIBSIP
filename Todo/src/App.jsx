import { TodoProvider, useTodo } from './context/TodoContext';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import './App.css';

const TodoApp = () => {
  const { pendingTasks, completedTasks } = useTodo();

  return (
    <div className="app">
      <header className="header">
        <h1>Daily Tasks</h1>
        <p className="subtitle">Stay organized, one task at a time</p>
      </header>

      <main className="main">
        <TaskForm />
        
        <div className="lists-container">
          <TaskList 
            title="Pending" 
            tasks={pendingTasks}
            emptyMessage="No pending tasks. Add one above!"
          />
          
          <TaskList 
            title="Completed" 
            tasks={completedTasks}
            emptyMessage="No completed tasks yet. Get to work!"
          />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
