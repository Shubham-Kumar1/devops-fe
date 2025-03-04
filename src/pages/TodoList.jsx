import { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import { getProtocol } from "../config";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${getProtocol()}://${process.env.REACT_APP_BACKENDHOST}/api/todos`, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos.");
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to fetch todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a todo.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${getProtocol()}://${process.env.REACT_APP_BACKENDHOST}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo.");
      }

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <h1>My Tasks</h1>
        <p className="todo-stats">
          {activeTodosCount} tasks remaining
        </p>
      </div>

      <form className="todo-form" onSubmit={addTodo}>
        <div className="input-group">
          <input
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="add-todo-btn"
            disabled={isLoading || !title.trim()}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="todo-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {isLoading && todos.length === 0 ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Loading your tasks...</span>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
          ))}
          {!isLoading && filteredTodos.length === 0 && (
            <li className="empty-state">
              <i className="fas fa-clipboard-list"></i>
              <p>No tasks found</p>
              <p className="empty-state-subtitle">
                {filter === 'all' 
                  ? "Add a new task to get started!" 
                  : `No ${filter} tasks found.`}
              </p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
