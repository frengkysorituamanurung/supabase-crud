import React from 'react';
import { supabase } from '../supabaseClient';

const TodoList = ({ todos, setTodos }) => {
  const handleToggleComplete = async (id, isCompleted) => {
    const { error } = await supabase
      .from('TodoList')
      .update({ is_completed: !isCompleted })
      .eq('id', id);

    if (error) {
      console.error('Error updating todo:', error);
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !isCompleted } : todo
      )
    );
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('TodoList')
      .update({ is_deleted: true }) // Tandai sebagai "dihapus"
      .eq('id', id);

    if (error) {
      console.error('Error soft deleting todo:', error);
      return;
    }

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h2>Todo Items</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.is_completed ? 'line-through' : 'none',
              }}
            >
              {todo.task}
            </span>
            <button
              className={todo.is_completed ? 'undo' : 'complete'}
              onClick={() => handleToggleComplete(todo.id, todo.is_completed)}
            >
              {todo.is_completed ? 'Undo' : 'Complete'}
            </button>
            <button className="delete" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
