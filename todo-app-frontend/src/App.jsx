import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('https://localhost:5001/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (task.trim()) {
      const newTask = { text: task, completed: false };
      await fetch('https://localhost:5001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      setTask('');
      fetchTasks();
    }
  };

  const handleToggleTask = async (id, completed) => {
    await fetch(`https://localhost:5001/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await fetch(`https://localhost:5001/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? 'completed' : ''}>
            <span onClick={() => handleToggleTask(t.id, t.completed)}>{t.text}</span>
            <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
