// src/components/TodoItem.jsx
import axios from "axios";

export default function TodoItem({ todo, fetchTodos }) {
  const toggleComplete = async () => {
    await axios.put(`http://localhost:4400/api/todos/${todo.id}`, {
      completed: !todo.completed,
    }, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchTodos();
  };

  const deleteTodo = async () => {
    await axios.delete(`http://localhost:4400/api/todos/${todo.id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchTodos();
  };

  return (
    <li>
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.title}</span>
      <button onClick={toggleComplete}>Toggle Complete</button>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}
