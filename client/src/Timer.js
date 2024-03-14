// src/Timer.js
import React, { useState, useEffect } from 'react';
import './TimerMessage.css';
import { addPoints } from './PointsRequests';
import { showNotification } from '@mantine/notifications';
import timerDoneSound from './Assets/timerdone.mp3';
import useSound from 'use-sound';

/** 
 * Draws a timer with audio and visual features
 *
 * @param {*} - Udpating and tracking features of timer
 *      { timerLength, setTimerLength, username, isRunning, setIsRunning, onTimerFinish }
 * @return {*} - Customized Pomodoro timer with sessions and cycles
 */
const Timer = ({ timerLength, setTimerLength, username, isRunning, setIsRunning, onTimerFinish }) => {
  const [seconds, setSeconds] = useState(timerLength);
  const [cyclesCompleted, setCyclesCompleted] = useState(0); // use for tracking which cycle we are on
  const [isNewTimerInput, setIsNewTimerInput] = useState(false); // use for tracking if there is new timer input
  const [timerStatus, setTimerStatus] = useState('work');
  const [intervalId, setIntervalId] = useState(null);
  const [playTimerDone] = useSound(timerDoneSound);

  useEffect(() => {
    if (isRunning) {
      setSeconds(timerLength);
      setIsNewTimerInput(true);
    }
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
      return;
    }


    const sessionPoints = 5; // user earns 5 pts upon completing a pomodoro session
    const cyclePoints = 10; // user earns 10 pts upon completing a pomodoro cycle (4 sessions)

    // cyclesCompleted = 1 pomodoro session
      // 1 work session = +1 cyclesCompleted
      // 1 break session = +1 cyclesCompleted
      // 8 cyclesCompleted = 1 pomodoro cycle
    if(cyclesCompleted === 8 && isNewTimerInput) { // reset after completing 1 pomodoro cycle
      setCyclesCompleted(0);
    }
    else if (cyclesCompleted === 6 && isNewTimerInput && seconds === 0) // add cycle points after reaching final break session
     addPoints(username, cyclePoints).then((success) => {
      if (success) {
        console.log("Points successfully added after cycle break.");
        showNotification({
          title: '🌟 Points Added!',
          message: `Cycle completed: +${cyclePoints} points!`,
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
          } 
    });
  

    
/** 
 * Determines which countdowns (how many sec) to do based on session user is on
 *
 *  @return {*} - clearInterval(tempIntervalId)
 *      - hook dependency and intializing variables to determine seconds
 * */
const tempIntervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => Math.max(0, prevSeconds - 1)); // timer countdown
        return;
        }

      // due to the +1 cyclesCompleted increment starting at 0
        // even-numbered cyclesCompleted are the break sessions
      if (seconds === 0 && cyclesCompleted % 2 === 0) { 
          playTimerDone(timerDoneSound);
          onTimerFinish();
          if (seconds === 0 && cyclesCompleted === 6) { // countdown for cycle break
              setTimerStatus('cycleBreak');
              setSeconds(15);
              setTimerLength(15);
            }
          else {
            setTimerStatus('sessionBreak') // countdown for regular session break
             setSeconds(5);
            setTimerLength(5);
        }

          console.log("Session complete in Timer.js");

          // +5 points for regular sessions
          console.log(cyclesCompleted);
          if (cyclesCompleted !== 6 && cyclesCompleted !== 7 &&  cyclesCompleted !== 8) {
            addPoints(username, sessionPoints).then((success) => {
              if (success) {
                showNotification({
                  title: '🌟 Points Added!',
                  message: `Session complete: +${sessionPoints} points!`,
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
          }

          setCyclesCompleted(cyclesCompleted + 1); // Increment cycleCompleted after break session
      } 
      else {
          clearInterval(intervalId);
          setCyclesCompleted(cyclesCompleted + 1); // Increment cycleCompleted after work session
          setTimerStatus('work');
          setIsNewTimerInput(false);
          setIsRunning(false);
          return 0;
        }
    }, 1000);

    setIntervalId(tempIntervalId);
    return () => clearInterval(tempIntervalId);
  }, [seconds, timerLength, isRunning]);


  /**
   * Determines Message in Status Bar with switch case invoked by changing sessions
   * 
   * @param {string} timerStatus - Sets what session timer is on
   * @return {string} - Message displayed in status bar
   */
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


  /**
   * Format time in MM:SS
   *
   * @param {*} timeInSeconds
   * @return {*} - Displays Time in MM:SS format
   */
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


// Calculate what % we are through the current session
  const progress = (timerLength - seconds) / timerLength; 


  /**
   * Draw Timer that Fills Quadrants according to the session user is on
   *
   * @param {*} quadrantIndex - 
   * @return {*} - Manually drawn circle with quadrants
   */
  const getQuadrantFill = (quadrantIndex) => {
    if (cyclesCompleted === 0) {
      if (quadrantIndex === 1 && isNewTimerInput) { // Check if there is new time input
        return `rgba(200, 162, 200, ${progress})`; // Increase opacity of quadrant as session progresses
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 1) {
      if (quadrantIndex === 1 ) { // Previously filled quadrants remain filled during break
        return `rgba(200, 162, 200)`;
      }

      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 2) {
      if (quadrantIndex === 1 ) { // Previously filled quadrants remain filled
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 && isNewTimerInput) { 
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 3) {
      if (quadrantIndex === 1 ) { // 
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }

      else {
        return 'transparent';
      }

    }

    if (cyclesCompleted === 4) {
      if (quadrantIndex === 1 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 && isNewTimerInput ) {
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 5) {
      if (quadrantIndex === 1 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 ) {
        return `rgba(200, 162, 200)`;
      }
      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 6 ) {
      if (quadrantIndex === 1 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 ) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 4 && isNewTimerInput) {
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 7 ) {
      if (quadrantIndex === 1) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 4) {
        return `rgba(200, 162, 200)`;
      }
      else {
        return 'transparent';
      }
    }

    else {
      return 'transparent';
    }
  };

  return (
      <div>
        <div className="circular-timer">
          <svg className="circular-timer-svg" width="300" height="300"> 
            <g transform="rotate(-90, 150, 150)">
              <path
                  d="M 150 150 L 265 150 A 110 200 0 0 1 150 260 Z" // Manually drew quadrants
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
                  cx="150"       // Drew outer ring of timer
                  cy="150"
                  r="110"
                  stroke="white"
                  strokeWidth="14"
                  fill="none"
              ></circle>
              <circle
                  className="circular-timer-progress"
                  cx="150"   // Drew pink progress bar
                  cy="150"
                  r="110"
                  strokeDasharray={`${progress * 691} 691`}
                  stroke="pink"
                  strokeWidth="14"
                  fill="transparent"
              ></circle>
            </g>
            <text
                className="circular-timer-text custom-timer"
                x="50%"
                y="50%"
                textAnchor="middle"
                dy="0.3em"
                fill="cornsilk"
            >
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
