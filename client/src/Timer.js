// src/Timer.js
import React, { useState, useEffect } from 'react';
import './TimerMessage.css';
import { addPoints } from './PointsRequests';
import { showNotification } from '@mantine/notifications';

const Timer = ({ timerLength, onTimerFinish, username }) => {
  const [seconds, setSeconds] = useState(timerLength);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isNewTimerInput, setIsNewTimerInput] = useState(false);
  const [lastQuadrantDelay, setLastQuadrantDelay] = useState(false); // this basically makes sure that we see last quadrant filled for a few seconds before the timer restarts
  const [timerStatus, setTimerStatus] = useState('work'); 


  useEffect(() => {
    setSeconds(timerLength);
    setIsNewTimerInput(true);
  }, [timerLength]);

  useEffect(() => {
    let intervalId = null;
    const sessionPoints = 5;
    const cyclePoints = 10;

    if (isNewTimerInput && seconds === timerLength) {
      setTimerStatus('work');
    }  
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

    } else if (seconds === 0 && isNewTimerInput) {
      onTimerFinish();
      setSeconds(5);             // THIS IS SESSION BREAK
                                        
      if (cyclesCompleted < 3) {
        setTimerStatus('sessionBreak'); // Update timer status
        setCyclesCompleted(cyclesCompleted + 1);
        addPoints(username, sessionPoints).then((success) => {
          if (success) {
            showNotification({
              title: '🌟 Points Added!',
              message: `You've just earned ${sessionPoints} points! Great job! 🎉`,
              color: 'pink', 
              autoClose: 3000, 
              style: {
                backgroundColor: '#e8ad64', 
                color: '#000000', 
                fontFamily: '"Frankfurter Std", cursive', 
                fontSize: '1.5rem', 
                padding: '2rem',
                borderRadius: '1.5rem', 
              },
              radius: 50, 
              withCloseButton: false, 
            });
          } else {
            console.error("Failed to add points after session break.");
          }
        });
      } else if (!lastQuadrantDelay) { // 4th quadrant checker
        setLastQuadrantDelay(true); // Start delaying for last quadrant
        setTimeout(() => {
          // After delay remove last quadrant delay
          setCyclesCompleted(0);
          setLastQuadrantDelay(false); // Reset delay state
          setSeconds(10);                                    // THIS IS CYCLE BREAK
          setTimerStatus('cycleBreak'); // Update timer status
          addPoints(username, cyclePoints).then((success) => {
            if (success) {
              console.log("Points successfully added after cycle break.");
              showNotification({
                title: '🌟 Points Added!',
                message: `You've just earned ${cyclePoints} points! Great job! 🎉`,
                color: 'pink', 
                autoClose: 3000, 
                style: {
                  backgroundColor: '#e8ad64', 
                  color: '#000000', 
                  fontFamily: '"Frankfurter Std", cursive', 
                  fontSize: '1.5rem', 
                  padding: '2rem',
                  borderRadius: '1.5rem', 
                },
                radius: 50, 
                withCloseButton: false, 
              });
            } else {
              console.error("Failed to add points after cycle break.");
            }
          });  

        }, 7000); // Delay duration in milliseconds (this is 7)
      }
      setIsNewTimerInput(false);
    }
    return () => clearInterval(intervalId);
  }, [seconds, cyclesCompleted, onTimerFinish, isNewTimerInput, lastQuadrantDelay, timerLength, username]); // 

const getMessage = () => {
  switch (timerStatus) {
    case 'work':
      return 'You are in work mode';
    case 'sessionBreak':
      return 'You are in session break';
    case 'cycleBreak':
      return 'You are in cycle break';
    default:
      return '';
  }
};

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const progress = (timerLength - seconds) / timerLength;


  // filling the quarters according to which cycle we are on
  const getQuadrantFill = (quadrantIndex) => {
    let currentSessionQuadrant = (cyclesCompleted % 4) + (isNewTimerInput || lastQuadrantDelay ? 1 : 0);
    if (cyclesCompleted === 4 && (isNewTimerInput || lastQuadrantDelay)) {
      currentSessionQuadrant = 1;
    }
  
    if (quadrantIndex < currentSessionQuadrant) {
      // Quadrants before the current session are filled
      return `rgba(200, 162, 200)`;
    } else if (quadrantIndex === currentSessionQuadrant) {
      // Current session's quadrant fills
      return `rgba(200, 162, 200, ${progress})`;
    }
  
  
    return 'transparent';
  };

// did some clock reformatting!
  return (
      <div>
        <div className="circular-timer">
          <svg className="circular-timer-svg" width="300" height="300">
            <g transform="rotate(-90, 150, 150)">
              <path
                  d="M 150 150 L 265 150 A 110 200 0 0 1 150 260 Z" // manually drew quadrants
                  fill={getQuadrantFill(1)}
              ></path>
              <path
                  d="M 150 150 L 47 150 A 90 90 0 0 0 150 260 Z"
                  fill={getQuadrantFill(2)}
              ></path>
              <path
                  d="M 150 150 L 150 40 A 100 90 0 0 0 45 150 Z"
                  fill={getQuadrantFill(3)}
              ></path>
              <path
                  d="M 150 150 L 150 40 A 100 100 0 0 1 260 150 Z"
                  fill={getQuadrantFill(4)}
              ></path>
              <circle
                  cx="150"       // create outer white ring
                  cy="150"
                  r="110"
                  stroke="white"
                  strokeWidth="14"
                  fill="none"
              ></circle>
              <circle
                  className="circular-timer-progress"
                  cx="150"   // create pink fill-up ring
                  cy="150"
                  r="110"
                  strokeDasharray={`${progress * 691} 691`}
                  stroke="pink"
                  strokeWidth="14"
                  fill="transparent"
              ></circle>
            </g>
            <text className="circular-timer-text custom-timer" x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="cornsilk">
              {formatTime(seconds)}
            </text>
          </svg>
        </div>
        <div className="timer-message">
        {getMessage()}
      </div>
      </div>
      
      
  );
  
};



export default Timer;