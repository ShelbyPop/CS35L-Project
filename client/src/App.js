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
  const [timerLength, setTimerLength] = useState(0); // Initial timer length in seconds
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started

  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 1 : 25 * 60); // Convert minutes to seconds, default to 25 minutes if not specified
  }; // change 1 back to 60 for actual minutes

  const startGame = () => {
    setGameStarted(true); // Function to start the game
  };

  const exitGame = () => {
    setGameStarted(false);
  };

  return (
      <div className="App">
        <header className="custom-header">
          <h1>Café PomPom</h1>
          {!gameStarted ? (
              <>

                <MantineProvider>
                  <div className="custom-login">
                    <LoginInput/>
                  </div>
                </MantineProvider>

                <div className="custom-timer">
                <Timer timerLength={timerLength} onTimerFinish={startGame} />
                </div>


                <div className="custom-input">
                  <TimerInput onSetTimer={handleSetTimer}/>


                </div>

                <div className="custom-clock">
                  <Clock/>


                </div>


              </>
          ) : (
              <GameWorld onExitGame={exitGame}/>
          )}
        </header>
      </div>
  );
}

export default App;
