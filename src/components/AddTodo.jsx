import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AddTodo = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;

    const { data, error } = await supabase
      .from('TodoList')
      .insert([{ task, is_completed: false, is_deleted: false }]) // Tambahkan is_deleted
      .select('*'); // Pastikan data baru dikembalikan

    if (error) {
      console.error('Error adding todo:', error);
      return;
    }

    if (data && data.length > 0) {
      setTask('');
      onAdd(data[0]); // Tambahkan data baru ke state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
