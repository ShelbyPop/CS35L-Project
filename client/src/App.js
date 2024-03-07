import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';
import Navigation from './Navigation'; 
import ShopButton from './ShopButton';

function App() {
  const [timerLength, setTimerLength] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false); // Tracks if the timer has been activated by the user.

  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 1 : 25 * 60);
    setIsTimerActive(true);
  }; // adjust back to 60 for actual minutes

  const onTimerFinish = () => {
    console.log("Timer cycle completed!");
    setIsTimerActive(false); 
  };

  return (
    <div className="App">
      <Navigation />
      <header className="custom-header">
        <h1>Café PomPom</h1>
        <MantineProvider>
          <div className="custom-login">
            <LoginInput />
          </div>
        </MantineProvider>

        <div className="custom-input">
          <TimerInput onSetTimer={handleSetTimer} />
        </div>

        {isTimerActive && (
          <div className="custom-timer">
            <Timer timerLength={timerLength} onTimerFinish={onTimerFinish} />
          </div>
        )}

        <div className="custom-clock">
          <Clock />
        </div>

        <ShopButton />
      </header>
    </div>
  );
}

export default App;
