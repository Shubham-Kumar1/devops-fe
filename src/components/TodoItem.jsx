import axios from "axios";
import { getProtocol } from "../config";
import { useState } from "react";

export default function TodoItem({ todo, fetchTodos }) {
  const [isLoading, setIsLoading] = useState(false);

  const toggleComplete = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `${getProtocol()}://${process.env.REACT_APP_BACKENDHOST}/api/todos/${todo.id}`,
        { completed: !todo.completed },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error toggling completion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async () => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    
    try {
      setIsLoading(true);
      await axios.delete(
        `${getProtocol()}://${process.env.REACT_APP_BACKENDHOST}/api/todos/${todo.id}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}>
      <div className="todo-content">
        <label className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleComplete}
            disabled={isLoading}
          />
          <span className="checkmark"></span>
        </label>
        <span className="todo-title">{todo.title}</span>
      </div>
      <div className="todo-actions">
        <button
          className="todo-btn edit-btn"
          onClick={() => {/* TODO: Implement edit functionality */}}
          disabled={isLoading}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="todo-btn delete-btn"
          onClick={deleteTodo}
          disabled={isLoading}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
}
