// src/components/GameWorld/GameWorld.js
import React, { useEffect } from 'react';
import './GameWorld.css';

const GameWorld = ({ onExitGame }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onExitGame(); // This will be called after 5 minutes
    }, 30000); // 300000 milliseconds = 5 minutes

    return () => clearTimeout(timeoutId);
  }, [onExitGame]);

  return (
    <div className="game-world">
      <h1>Welcome to Café PomPom!</h1>
      {/* More game elements will go here */}
    </div>
  );
};

export default GameWorld;
