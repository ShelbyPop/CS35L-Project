import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';
import GameWorld from './GameWorld';
import Navigation from './Navigation'; // Adjust the path as necessary


function App() {
  const [timerLength, setTimerLength] = useState(0); 
  const [gameStarted, setGameStarted] = useState(false); // Tracks if the game has started.
  const [isTimerActive, setIsTimerActive] = useState(false); // Tracks if the timer has been activated by the user.

 


  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 1 : 25 * 60);
    setIsTimerActive(true); 
  }; // change 1 back to 60 for actual minutes


  const startGame = () => {
    setGameStarted(true);
    setIsTimerActive(false); 
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
          <Navigation /> 
            <MantineProvider>

            </MantineProvider>
            <MantineProvider>
              <div className="custom-login">
                <LoginInput/>
              </div>
            </MantineProvider>

            <div className="custom-input">
              <TimerInput onSetTimer={handleSetTimer}/>
            </div>

            {isTimerActive && (
              <div className="custom-timer">
                <Timer timerLength={timerLength} onTimerFinish={startGame} />
              </div>
            )}

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
