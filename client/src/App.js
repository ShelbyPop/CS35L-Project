// src/App.js
import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import '@mantine/core/styles/global.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';
import GameWorld from './GameWorld';
import Navigation from './Navigation'; // Adjust the path as necessary
import { createSession } from './SessionsRequests.js';

function App() {
  const [timerLength, setTimerLength] = useState(0); 
  const [gameStarted, setGameStarted] = useState(false); // Tracks if the game has started.
  const [isTimerActive, setIsTimerActive] = useState(false); // Tracks if the timer has been activated by the user.
  const [sessionStartTime, setSessionStartTime] = useState(null); // Tracks start time of current session
  const [username, setUsername] = useState(null); // Tracks username of user that is currently logged in

  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 1 : 25 * 60);
    setIsTimerActive(true);
    // Get start time of current session
    setSessionStartTime(new Date());
  }; // TODO: change 1 back to 60 for actual minutes


  const startGame = async () => {
    setGameStarted(true);
    setIsTimerActive(false);

    const sessionLength = Math.round(((new Date()) - sessionStartTime) / 1000);
    console.log(sessionStartTime, new Date(), sessionLength);
    // Insert new session into database
    await createSession(username, sessionStartTime, new Date(), sessionLength);
  };

  const exitGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="App">
      <Navigation />
      <header className="custom-header">
        <h1>Café PomPom</h1>
        {!gameStarted ? (
          <>
          <Navigation username={username} />
            <MantineProvider>
              <div className="custom-login">
                <LoginInput setUsername={setUsername} />
              </div>
            </MantineProvider>

            <div className="custom-input">
              <TimerInput onSetTimer={handleSetTimer} />
            </div>

            {isTimerActive && (
              <div className="custom-timer">
                <Timer timerLength={timerLength} onTimerFinish={startGame} />
              </div>
            )}

            <div className="custom-clock">
              <Clock />
            </div>
          </>
        ) : (
          <GameWorld onExitGame={exitGame} />
        )}
      </header>
    </div>
  );
}

export default App;
