import React, { useEffect, useState } from 'react';
import axios from 'axios';
const HOSTNAME=process.env.REACT_APP_HOSTNAME
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`http://${HOSTNAME}:4400/api/todos`);
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
