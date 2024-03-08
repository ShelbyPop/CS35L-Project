import React, { useState } from 'react';
import './ShopButton.css';

const ShopButton = () => {
  const [showShop, setShowShop] = useState(false);

  const toggleShop = () => {
    setShowShop(!showShop);
  };

  return (
    <div className="game-world">
      <button className="shop-button" onClick={toggleShop}>Shop</button>

      {showShop && (
        <div className="shop-fullscreen">
          <div className="shop-content">
            <h2>This is the Shop</h2>
            <p>Buy items here!</p>
            <div className="shop-items">
              <img src={require("./Assets/coffee_64x.png")} alt="Coffee"/>
              <img src={require("./Assets/muffin_64x.png")} alt="Muffin"/>
              <img src={require("./Assets/toast_64x.png")} alt="Toast"/>
            </div>
            <button onClick={toggleShop}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopButton;
