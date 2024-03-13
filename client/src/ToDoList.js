import React, { useState } from 'react';
import './ToDoList.css'; 
import { createToDo, getToDos, toggleToDo, deleteToDo } from './ToDoRequests.js';

const ToDoList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isVisible, setIsVisible] = useState(false); 

  const openToDoList = async (username) => {
    if (!isVisible) {
      const allTasks = await getToDos(username);
      setTasks(allTasks);
    }
    setIsVisible(!isVisible);
  };

  const addTask = async (username) => {
    if (!newTask.trim()) return;
    if (!username) {
      alert("Not logged in, cannot add task");
      return;
    }

    const task = await createToDo(username, newTask);
    if (!task) {
      alert("Cannot insert duplicate task");
      return;
    }
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask('');
  };

  const deleteTask = async (id) => {
    await deleteToDo(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const toggleCompletion = async (id) => {
    await toggleToDo(id);
    setTasks(tasks.map(task => task._id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="todo-list-container">
      <button className="todo-toggle-button" onClick={() => openToDoList(username)}>
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
          <button className="todo-button" onClick={() => addTask(username)}>Add Task</button>
          <ul>
            {tasks.map(task => (
              <li key={task._id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task._id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{task.text}</span>
                <button className="todo-delete-button" onClick={() => deleteTask(task._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ToDoList;