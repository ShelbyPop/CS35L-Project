// src/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ timerLength, onTimerFinish }) => {  // Add the onTimerFinish prop
  const [seconds, setSeconds] = useState(timerLength);

  useEffect(() => {
    setSeconds(timerLength);
  }, [timerLength]);

    useEffect(() => {
    if(seconds === 0) {
      onTimerFinish();  // Call the onTimerFinish when the timer hits 0
      return;
    }
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, onTimerFinish]);  // Include onTimerFinish in the dependency array


  
  // Format seconds into MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progress = (timerLength - seconds) / timerLength;

  return (
      <div>
        <h2>Timer</h2>
        <div className="circular-timer">
          <svg className="circular-timer-svg" width="200" height="200">
            <circle className="circular-timer-background" cx="100" cy="100" r="90"></circle>
            <circle
                className="circular-timer-progress"
                cx="100"
                cy="100"
                r="90"
                strokeDasharray={`${progress * 565} 565`}
                stroke="pink"
                strokeWidth="20"
                fill="white"
            ></circle>
            <text className="circular-timer-text" x="50%" y="50%" textAnchor="middle" dy="0.3em">
              {formatTime(seconds)}
            </text>
          </svg>
        </div>
      </div>
  );
};

export default Timer;
