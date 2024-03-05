// src/App.js
import React, { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';
import TimerInput from './TimerInput';
import LoginInput from './LoginInput';
import GameWorld from './GameWorld';
import Table from './Table.js';
import Navigation from './Navigation'; // Adjust the path as necessary


function App() {
  const [timerLength, setTimerLength] = useState(0); 
  const [gameStarted, setGameStarted] = useState(false); // Tracks if the game has started.
  const [isTimerActive, setIsTimerActive] = useState(false); // Tracks if the timer has been activated by the user.
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])

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

  // Update data on render & on query update
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`http://localhost:5050?query=${query}`);
      const data = await res.json();
      setData(data);
    };
    fetchUsers();
  }, [query]);

  return (
    <div className="App">
      <Navigation />
      <header className="custom-header">
        <h1>Café PomPom</h1>
        {!gameStarted ? (
          <>
          <Navigation /> 
            <input placeholder="Search" className="search" onChange={(event) => setQuery(event.target.value)}/>
            <Table data={data ?? []} />
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
