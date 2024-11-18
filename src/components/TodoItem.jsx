// src/components/TodoItem.jsx
import axios from "axios";
const hostName = process.env.REACT_APP_HOST_NAME;
const PORT = process.env.REACT_APP_PORT;

export default function TodoItem({ todo, fetchTodos }) {
  const toggleComplete = async () => {
    await axios.put(`http://${hostName}:${PORT}/api/todos/${todo.id}`, {
      completed: !todo.completed,
    }, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchTodos();
  };

  const deleteTodo = async () => {
    await axios.delete(`http://${hostName}:${PORT}/api/todos/${todo.id}`, {
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
