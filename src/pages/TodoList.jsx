// src/pages/TodoList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

const HOSTNAME=process.env.REACT_APP_HOSTNAME

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null); // Track errors

  // Fetch all todos from the API
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`http://${HOSTNAME}:4400/api/todos`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to fetch todos. Please try again.");
    }
  };

  // Add a new todo
  const addTodo = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to add a todo.");
      return;
    }

    try {
      await axios.post(
        `http://${HOSTNAME}:4400/api/todos`,
        { title },
        {
          headers: { Authorization: token },
        }
      );
      setTitle("");
      fetchTodos(); // Fetch the updated list of todos
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo. Please try again.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>My Todos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if exists */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
        ))}
      </ul>
    </div>
  );
}
