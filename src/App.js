// src/App.js
import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';

function App() {
  const [timerLength, setTimerLength] = useState(25 * 60); // Initial timer length in seconds

  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 60 : 25 * 60); // Convert minutes to seconds, default to 25 minutes if not specified
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PomPom</h1>
        <TimerInput onSetTimer={handleSetTimer} />
        <Timer timerLength={timerLength} />
        <Clock />
        <MantineProvider>
          <LoginInput />
        </MantineProvider>
      </header>
    </div>
  );

  // Wrap components that use Mantine
}

export default App;
