// src/TimerInput.js
import React, { useState } from 'react';

const TimerInput = ({ onSetTimer }) => {
  const [timerLength, setTimerLength] = useState(25);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTimerLength(value);
  };

  const handleSetTimer = () => {
    onSetTimer(timerLength);
  };

  return (
    <div>
      <label>
        Set Timer Length (minutes):
        <input type="number" value={timerLength} onChange={handleChange} />
      </label>
      <button onClick={handleSetTimer}>Set Timer</button>
    </div>
  );
};

export default TimerInput;