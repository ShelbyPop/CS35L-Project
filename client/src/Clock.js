import React, { useState, useEffect } from 'react';

/**
 * Clock component that displays the current time
 * The time is updated every second
 * 
 * @component
 */
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  /**
   * Formats the current time
   *
   * @return {*} 
   */
  const formattedTime = () => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  return (
    <div>
      <div className="custom-clock" style={{ marginTop: '10px' }}>Current time: {formattedTime()} </div>
    </div>
  );
};

export default Clock;
