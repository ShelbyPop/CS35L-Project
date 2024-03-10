import React, { useState } from 'react';
import './ToDoList.css'; 

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isVisible, setIsVisible] = useState(false); 

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="todo-list-container">
      <button className="todo-toggle-button" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Close' : 'ToDo List'}
      </button>
      
      {isVisible && (
        <>
          <input
            className="todo-input"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button className="todo-button" onClick={addTask}>Add Task</button>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{task.text}</span>
                <button className="todo-delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ToDoList;