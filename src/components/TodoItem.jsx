import axios from "axios";
export default function TodoItem({ todo, fetchTodos }) {
  const toggleComplete = async () => {
    try {
      await axios.put(
        `http://${process.env.REACT_APP_BACKENDHOST}/api/todos/${todo.id}`,
        { completed: !todo.completed },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };
  const deleteTodo = async () => {
    try {
      await axios.delete(
        `http://${process.env.REACT_APP_BACKENDHOST}/api/todos/${todo.id}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      fetchTodos();
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
