// src/App.js
import React from 'react';
import './App.css';
import Timer from './Timer';
import Clock from './Clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PomPom</h1>
        <Timer />
        <Clock />
      </header>
    </div>
  );
}

export default App;
