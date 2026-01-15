import { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const STORAGE_KEY = 'todo-app-tasks';

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, {
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
      }];
    
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null
            }
          : task
      );
    
    case 'EDIT_TASK':
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );
    
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(todoReducer, [], loadFromStorage);

  useEffect(() => {
    saveToStorage(tasks);
  }, [tasks]);

  const addTask = (text) => dispatch({ type: 'ADD_TASK', payload: text });
  const toggleTask = (id) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const editTask = (id, text) => dispatch({ type: 'EDIT_TASK', payload: { id, text } });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <TodoContext.Provider value={{
      tasks,
      pendingTasks,
      completedTasks,
      addTask,
      toggleTask,
      editTask,
      deleteTask
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};
