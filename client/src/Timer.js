// src/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ timerLength, onTimerFinish}) => {
  const [seconds, setSeconds] = useState(timerLength);
  const [cyclesCompleted, setCyclesCompleted] = useState(0); // use for tracking which cycle we are on
  const [isNewTimerInput, setIsNewTimerInput] = useState(false); // use for tracking if there is new timer input




//note: timer still does not have 5-min breaks
// note2: time input has issues, and you must put in a different value in order to start a new cycle, for some reason




  useEffect(() => {
    setSeconds(timerLength);
    setIsNewTimerInput(true);
  }, [timerLength]);
ç
  useEffect(() => {
    if(cyclesCompleted > 4) { // RETURN once we have reached 4 cycles
      // will change once we set up the user database
      // for now, we will just RETURN
      onTimerFinish();
      return;
    }
    const intervalId = setInterval(() => {

      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }

        else {
          clearInterval(intervalId);
          setCyclesCompleted(cyclesCompleted + 1); // update cycle
          setIsNewTimerInput(false);
          return 0;
        }

      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds], timerLength);




  // Format seconds into MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const progress = (timerLength - seconds) / timerLength;


  // filling the quarters according to which cycle we are on
  const getQuadrantFill = (quadrantIndex) => {

    if (cyclesCompleted === 0) {
      if (quadrantIndex === 0) {
        return `rgba(200, 162, 200, ${progress})`; // get more opaque as time goes on (lilac!)
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 1) {
      if (quadrantIndex === 0 ) { // make sure previous fillings do not get reset
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 1 && isNewTimerInput) { // check if there is new time input
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }

    if (cyclesCompleted === 2 ) {
      if (quadrantIndex === 0) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 1) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2 && isNewTimerInput) {
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }


    if (cyclesCompleted === 3 ) {
      if (quadrantIndex === 0) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 1) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 2) {
        return `rgba(200, 162, 200)`;
      }
      if (quadrantIndex === 3 && isNewTimerInput) {
        return `rgba(200, 162, 200, ${progress})`;
      }
      else {
        return 'transparent';
      }
    }


    else {
      return 'transparent';
    }
  };


// did some clock reformatting!
  return (
      <div>
        <div className="circular-timer">
          <svg className="circular-timer-svg" width="300" height="300">
            <g transform="rotate(-90, 150, 150)">
              <path
                  d="M 150 150 L 265 150 A 110 200 0 0 1 150 260 Z" // manually drew quadrants
                  fill={getQuadrantFill(0)}
              ></path>
              <path
                  d="M 150 150 L 47 150 A 90 90 0 0 0 150 260 Z"
                  fill={getQuadrantFill(1)}
              ></path>
              <path
                  d="M 150 150 L 150 40 A 100 90 0 0 0 45 150 Z"
                  fill={getQuadrantFill(2)}
              ></path>
              <path
                  d="M 150 150 L 150 40 A 100 100 0 0 1 260 150 Z"
                  fill={getQuadrantFill(3)}
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
            <text className="circular-timer-text custom-font" x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="cornsilk">
              {formatTime(seconds)}
            </text>
          </svg>
        </div>
      </div>
  );
};

export default Timer;