import React, { useEffect, useState } from 'react';
import axios from 'axios';
const hostName = process.env.REACT_APP_HOST_NAME;
const PORT = process.env.REACT_APP_PORT;
const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`http://${hostName}:${PORT}/api/todos`);
        setTodos(res.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <span>{todo.title}</span>
          <button>Edit</button>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
