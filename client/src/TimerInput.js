// src/TimerInput.js
import React, { useState } from 'react';

/**
 * Handles Time Input to be passed to Timer for countdown
 *
 * @param {*} { onSetTimer } - Default or user input
 * @return {*} - Bar/button that accepts user input for timerLength
 */
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
        <input type="number" value={timerLength} onChange={handleChange} />
      </label>
      <button onClick={handleSetTimer}>Set Timer (sec)</button>
    </div>
  );
};

export default TimerInput;