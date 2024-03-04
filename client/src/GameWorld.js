// src/GameWorld.js
import React, { useEffect, useState } from 'react';
import './GameWorld.css';

const GameWorld = ({ onExitGame }) => {
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onExitGame(); // This will be called after 5 minutes
    }, 30000); // 300000 milliseconds = 5 minutes

    return () => clearTimeout(timeoutId);
  }, [onExitGame]);

  // Function to toggle the shop popup
  const toggleShop = () => {
    setShowShop(!showShop);
  };

  return (
    <div className="game-world">
      <h1>Welcome to Café PomPom!</h1>
      {/* Shop button */}
      <button onClick={toggleShop}>Shop</button>
      {/* Shop popup */}
      {showShop && (
        <div className="shop-popup">
          <h2>This is the Shop</h2>
          <p>Buy items here!</p>
          <div className="shop-items">
          <img src={require("./Assets/coffee_64x.png")} />
          <img src={require("./Assets/muffin_64x.png")} />
          <img src={require("./Assets/toast_64x.png")} />

            {/* Add more sprites here */}
          </div>
          <button onClick={toggleShop}>Close</button>
        </div>
      )}
    </div>
  );
};

export default GameWorld;
