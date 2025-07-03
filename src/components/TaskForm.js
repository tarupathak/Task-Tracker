import React, { useState } from 'react';
import '../styles/TaskForm.css';

const priorities = ['Low', 'Medium', 'High'];

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!title.trim()) errs.title = 'Title is required';
    else if (title.trim().length < 3) errs.title = 'Title must be at least 3 characters';

    if (desc.length > 500) errs.desc = 'Description must be under 500 characters';

    if (!priorities.includes(priority)) errs.priority = 'Invalid priority';

    if (!dueDate) errs.dueDate = 'Due date is required';
    else if (new Date(dueDate) < new Date(new Date().toDateString()))
      errs.dueDate = 'Due date cannot be in the past';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onAdd({
      id: Date.now(),
      title: title.trim(),
      description: desc.trim(),
      completed: false,
      createdAt: new Date().toLocaleString(),
      priority,
      dueDate,
    });

    setTitle('');
    setDesc('');
    setPriority('Low');
    setDueDate('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Add New Task</h3>

      <input
        type="text"
        placeholder="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <span className="error">{errors.title}</span>}

      <textarea
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {errors.desc && <span className="error">{errors.desc}</span>}

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {priorities.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
      {errors.priority && <span className="error">{errors.priority}</span>}

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      {errors.dueDate && <span className="error">{errors.dueDate}</span>}

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
