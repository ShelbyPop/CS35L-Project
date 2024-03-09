import React, { useEffect, useState } from 'react';
import './ShopButton.css';
import { getPoints, addPoints } from './PointsRequests.js';
import coffeeImage from './Assets/coffee_64x.png';
import muffinImage from './Assets/muffin_64x.png';
import toastImage from './Assets/toast_64x.png';
import coinImage from './Assets/coin_16x.png';


const ShopButton = ({ username }) => {
  const [showShop, setShowShop] = useState(false);
  const [points, setPoints] = useState("");

  useEffect(() => {
    getPoints(username).then((points) => setPoints(points));
  }, [username, showShop]);

  console.log(`${points} points`);

  const toggleShop = () => {
    setShowShop(!showShop);
  };

  const buyItem = async (cost) => {
    if (points >= cost) {
      const success = await addPoints(username, -cost);
      if (success) {
        const updatedPoints = await getPoints(username);
        setPoints(updatedPoints);
        alert(`Item purchased! You now have ${points - cost} ${points - cost === 1 ? 'coin' : 'coins'} remaining.`);
      } else {
        alert('There was an issue with the transaction.');
      }
    } else {
      alert(`Not enough points! You only have ${points} ${points === 1 ? 'coin' : 'coins'}.`);
      
    }
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
              <button className="item-button" onClick={() => buyItem(10)}>
                <img src={coffeeImage} alt="Coffee"/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>10</span>
                </div>
              </button>
              <button className="item-button" onClick={() => buyItem(15)}>
                <img src={muffinImage}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>15</span>
                </div>
              </button>
              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={toastImage}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>
            </div>
            <button onClick={toggleShop}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopButton;
