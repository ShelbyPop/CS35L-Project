import React, { useEffect, useState } from 'react';
import './ShopButton.css';
import { getPoints, addPoints } from './PointsRequests.js';
import coffeeImage from './Assets/coffee_64x.png';
import muffinImage from './Assets/muffin_64x.png';
import toastImage from './Assets/toast_64x.png';
import coinImage from './Assets/coin_16x.png';
import coffee1Image from './Assets/coffee2.png';
import coffee2Image from './Assets/coffee3.png';
import cake1Image from './Assets/cake1.png';
import cake2Image from './Assets/cake2.png';
import pie1Image from './Assets/pie1.png';
import pie2Image from './Assets/pie2.png';
import pie3Image from './Assets/pie3.png';
import pie4Image from './Assets/pie4.png';
import pie5Image from './Assets/pie5.png';
import pie6Image from './Assets/pie6.png';
import pan1Image from './Assets/pan1.png';
import pan2Image from './Assets/pan2.png';
import donut1Image from './Assets/donut1.png';
import donut2Image from './Assets/donut2.png';
import donut3Image from './Assets/donut3.png';
import donut4Image from './Assets/donut4.png';
import waffle1Image from './Assets/waffle1.png';
import waffle2Image from './Assets/waffle2.png';
import waffle3Image from './Assets/waffle3.png';
import waffle4Image from './Assets/waffle4.png';
import cin1Image from './Assets/cin1.png';
import cin2Image from './Assets/cin2.png';




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

              <button className="item-button" onClick={() => buyItem(10)}>
                <img src={coffee1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>10</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(10)}>
                <img src={coffee2Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>10</span>
                </div>
              </button>
              

              <button className="item-button" onClick={() => buyItem(40)}>
                <img src={cake1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>40</span>
                </div>
              </button>
              
              <button className="item-button" onClick={() => buyItem(50)}>
                <img src={cake2Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>50</span>
                </div>
              </button>
              
              <button className="item-button" onClick={() => buyItem(50)}>
                <img src={pie1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>50</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(50)}>
                <img src={pie2Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>50</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(20)}>
                <img src={pie3Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>20</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(25)}>
                <img src={pie4Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>25</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(30)}>
                <img src={pie5Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>30</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(50)}>
                <img src={pie6Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={pan1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={pan2Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={donut1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={donut2Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={donut3Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={donut4Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={waffle1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={waffle2Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={waffle3Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={waffle4Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={cin1Image}/>
                <div className="item-info">
                  <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
                  <span>12</span>
                </div>
              </button>

              <button className="item-button" onClick={() => buyItem(12)}>
                <img src={cin2Image}/>
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
