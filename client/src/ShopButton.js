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


function ItemButton({ itemImage, price, buyItem }) {
  return (
    <button className="item-button" onClick={() => buyItem(price)}>
      <img src={itemImage}/>
      <div className="item-info">
        <img src={coinImage} alt="Coin" style={{width:'16px', height:'16px'}}/>
        <span>{price}</span>
      </div>
    </button>
  );
}


const ShopButton = ({ username }) => {
  const [showShop, setShowShop] = useState(false);
  const [points, setPoints] = useState("");
  const [selectedTab, setSelectedTab] = useState('coffee');
  
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

  const coffeeItems = [
    { image: coffeeImage, price: 10 },
    { image: coffee1Image, price: 10 },
    { image: coffee2Image, price: 10 }
  ];
  const cakeItems = [
    { image: cake1Image, price: 40},
    { image: cake2Image, price: 50}
  ];
  const pieItems = [
    { image: pie1Image, price: 50},
    { image: pie2Image, price: 50},
    { image: pie3Image, price: 20},
    { image: pie4Image, price: 25},
    { image: pie5Image, price: 30},
    { image: pie6Image, price: 50}
  ];
  const donutItems = [
    { image: donut1Image, price: 12},
    { image: donut2Image, price: 12},
    { image: donut3Image, price: 12},
    { image: donut4Image, price: 12}
  ];
  const waffleItems = [
    { image: waffle1Image, price: 12},
    { image: waffle2Image, price: 12},
    { image: waffle3Image, price: 12},
    { image: waffle4Image, price: 12}
  ];
  const miscItems = [
    { image: pan1Image, price: 12},
    { image: pan2Image, price: 12},
    { image: cin1Image, price: 12},
    { image: cin2Image, price: 12},
    { image: muffinImage, price: 12},
    { image: toastImage, price: 12}
  ];

  let itemsToDisplay;
  switch (selectedTab) {
    case 'coffee': itemsToDisplay= coffeeItems; break;
    case 'cakes': itemsToDisplay = cakeItems; break;
    case 'pies': itemsToDisplay = pieItems; break;
    case 'donuts': itemsToDisplay = donutItems; break;
    case 'waffles': itemsToDisplay = waffleItems; break;
    case 'misc': itemsToDisplay = miscItems; break;
  }

  return (
    <div className="game-world">
      <button className="shop-button" onClick={toggleShop}>Shop</button>

      {showShop && (
        <div className="shop-fullscreen">
          <div className="shop-content">
            <h2>This is the Shop</h2>
            <p>Buy items here!</p>
            <div className="shop-items">
              <div className="shop-tabs">
                <button onClick={() => setSelectedTab('coffee')}>Coffee</button>
                <button onClick={() => setSelectedTab('cakes')}>Cakes</button>
                <button onClick={() => setSelectedTab('pies')}>Pies</button>
                <button onClick={() => setSelectedTab('donuts')}>Donuts</button>
                <button onClick={() => setSelectedTab('waffles')}>Waffles</button>
                <button onClick={() => setSelectedTab('misc')}>Misc.</button>
              </div>

              <div className="shop-items">
                {itemsToDisplay.map((item, index) => (
                  <ItemButton key={index} itemImage={item.image} price={item.price} buyItem={buyItem} />
                ))}
              </div>
            </div>
            <button onClick={toggleShop}>Return</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopButton;
