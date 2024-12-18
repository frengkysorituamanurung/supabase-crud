import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { supabase } from './supabaseClient';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('TodoList')
        .select('*')
        .eq('is_deleted', false); // Hanya fetch data yang belum dihapus

      if (error) {
        console.error('Error fetching todos:', error);
      } else {
        setTodos(data);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo onAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
