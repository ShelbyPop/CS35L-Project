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

function App() {
  const [timerLength, setTimerLength] = useState(25 * 60); // Initial timer length in seconds
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])

  const handleSetTimer = (length) => {
    setTimerLength(length ? length * 60 : 25 * 60); // Convert minutes to seconds, default to 25 minutes if not specified
  };

  const startGame = () => {
    setGameStarted(true); // Function to start the game
  };

  const exitGame = () => {
    setGameStarted(false);
  };

  // Update data on render
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
      <header className="App-header">
        <h1>PomPom</h1>
        {!gameStarted ? (
          <>
            <TimerInput onSetTimer={handleSetTimer} />
            <Timer timerLength={timerLength} onTimerFinish={startGame} />
            <Clock />
            <input placeholder="Search" className="search" onChange={(event) => setQuery(event.target.value)}/>
            <Table data={data ?? []} />
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
