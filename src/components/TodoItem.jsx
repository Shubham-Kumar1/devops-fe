import axios from "axios";
const hostName = process.env.REACT_APP_HOST_NAME;
const PORT = process.env.REACT_APP_PORT;

export default function TodoItem({ todo, fetchTodos }) {
  // Toggle the completion state of a todo
  const toggleComplete = async () => {
    try {
      await axios.put(
        `http://${hostName}:${PORT}/api/todos/${todo.id}`,
        { completed: !todo.completed },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchTodos(); // Fetch updated todos after toggling completion status
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  // Delete a todo item
  const deleteTodo = async () => {
    try {
      await axios.delete(
        `http://${hostName}:${PORT}/api/todos/${todo.id}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchTodos(); // Fetch updated todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "",
        }}
      >
        {todo.title}
      </span>
      <button onClick={toggleComplete}>Toggle Complete</button>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}
