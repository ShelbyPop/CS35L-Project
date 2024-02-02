// src/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60); // Initial 25-minute timer
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId);
          setIsBreak(true); // Enable break timer when the initial timer reaches 0
          return 300; // Set break timer to 5 minutes (300 seconds)
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Format seconds into MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>{isBreak ? 'Break Timer' : 'Focus Time'}</h2>
      <p>Time Remaining: {formatTime(seconds)}</p>
    </div>
  );
};

export default Timer;
