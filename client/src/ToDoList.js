import React, { useState } from 'react';
import './ToDoList.css'; 
import { createToDo, getToDos, toggleToDo, deleteToDo } from './ToDoRequests.js';
/**
 * The ToDo List feature allows a user to manage their tasks
 * This handles tasks such as adding, toggling the completion status,
 * and deleting ToDo items
 * 
 * @component
 * @example
 * <ToDoList username="someusername" />
 * 
 * @param {Object} props The props object
 * @param {string} props.username The username the ToDo list belongs
 */
const ToDoList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isVisible, setIsVisible] = useState(false); 

  /**
   * Opens the ToDo list for the given username
   * If the list is already visible
   * it fetches and displays all the tasks associated with the username and toggles
   * the visibility of the ToDo list
   * 
   * @async
   * @function openToDoList
   * @param {string} username The username associated with the ToDo list to open
   */
  const openToDoList = async (username) => {
    if (!isVisible) {
      const allTasks = await getToDos(username);
      setTasks(allTasks);
    }
    setIsVisible(!isVisible);
  };

  /**
   * Adds a new task to the ToDo list for the specified username
   * Validates that the task is not empty and the user is logged in
   * Prevents the addition of duplicate tasks
   * 
   * @async
   * @function addTask
   * @param {string} username The username that the new task will be added to
   */
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

  /**
   * Deletes a task from the ToDo list by its ID
   * 
   * @async
   * @function deleteTask
   * @param {string} id The ID of the task to be deleted.
   */
  const deleteTask = async (id) => {
    await deleteToDo(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  /**
   * Toggles the completion status of a task in the ToDo list by its ID
   * 
   * @async
   * @function toggleCompletion
   * @param {string} id The ID of the task for which to toggle the completion status
   */
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
