// src/pages/TodoList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:4400/api/todos", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post("http://localhost:4400/api/todos", { title }, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setTitle("");
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>My Todos</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new todo" />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
        ))}
      </ul>
    </div>
  );
}
