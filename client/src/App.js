// src/App.js
import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';
import GameWorld from './GameWorld';

function App() {
  const [timerLength, setTimerLength] = useState(25 * 60); // Initial timer length in seconds
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started

  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 60 : 25 * 60); // Convert minutes to seconds, default to 25 minutes if not specified
  };

  const exitGame = () => {
    setGameStarted(false);
  };


  const startGame = () => {
    setGameStarted(true); // Function to start the game
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PomPom</h1>
        {!gameStarted ? (
          <>
            <TimerInput onSetTimer={handleSetTimer} />
            <Timer timerLength={timerLength} onTimerFinish={startGame} />
            <Clock />
            <MantineProvider>
              <LoginInput />
            </MantineProvider>
          </>
        ) : (
          <GameWorld onExitGame={exitGame} />
        )}
      </header>
    </div>
  );
}

export default App;
