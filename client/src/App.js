import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';
import Navigation from './Navigation'; 
import ShopButton from './ShopButton';
import ToDoList from './ToDoList.js';
import { createSession } from './SessionRequests.js';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles/global.css'; // Please don't delete this line, it will mess up the checkbox
import '@mantine/notifications/styles.css';

/**
 * The main component for the Café PomPom web app
 * This component manages the layout and functionality
 */
function App() {
  const [timerLength, setTimerLength] = useState(25 * 60); // Set a default timer length so it's not 0
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [username, setUsername] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
 /**
   * Sets the timer length and starts the timer
   * @param {number} length - The length of the timer in minutes
   */
  const onSetTimer = (length) => {
    setTimerLength(length ? length * 1 : 25 * 60); // Corrected for minutes
   // TODO: change 1 back to 60 for actual minutes
    setIsRunning(true);
    setSessionStartTime(new Date()); // Record the start time of the session
  };

   /**
   * Function called when the timer finishes
   * This function logs the session details and creates a new session in the database
   */
  const onTimerFinish = async () => {
    console.log("Timer cycle completed!");
    const sessionEndTime = new Date(Date.now() - 1000); // offset by 1 second due to tempIntervalId delay
    const sessionLength = Math.round((sessionEndTime - sessionStartTime) / 1000);
    console.log(sessionStartTime, sessionEndTime, sessionLength);
    // Insert new session into database
    await createSession(username, sessionStartTime, sessionEndTime, sessionLength);
  };

    // username and setUsername dependencies needed for user-related things to work properly
  return (
    <div className="App">
      <Navigation username={username} />
      
      <header className="custom-header">
        <h1>Café PomPom</h1>
        
        <MantineProvider>
          <div className="custom-login">
            <LoginInput setUsername={setUsername} />
          </div>
        </MantineProvider>

    
        <div className="custom-input">
          <TimerInput onSetTimer={onSetTimer} />
        </div>

        <MantineProvider> 
        <Notifications /> 
          <div className="custom-timer">
          <Timer 
            timerLength={timerLength} 
            setTimerLength={setTimerLength}
            username={username} 
            isRunning={isRunning} 
            setIsRunning={setIsRunning} 
            onTimerFinish={onTimerFinish} 
            />
           </div>
        </MantineProvider>

        <div className="custom-clock">
          <Clock />
        </div>

        <div className="todo-list-position-wrapper">
        <ToDoList username={username}/>
      </div>

        <ShopButton username={username} />
      </header>
    </div>
  );
}

export default App;

