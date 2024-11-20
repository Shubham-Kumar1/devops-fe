import axios from "axios";
const HOSTNAME=process.env.REACT_APP_HOSTNAME
export default function TodoItem({ todo, fetchTodos }) {
  // Toggle the completion state of a todo
  const toggleComplete = async () => {
    try {
      await axios.put(
        `http://${HOSTNAME}:4400/api/todos/${todo.id}`,
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
        `http://${HOSTNAME}:4400/api/todos/${todo.id}`,
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
