import React, { useEffect, useState, useRef} from 'react';
import './ShopButton.css';
import { getPoints, addPoints } from './PointsRequests.js';
import { allItems, addItem } from './ItemRequests.js';
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
import CoffeeButton from './Assets/CoffeeButton_64x.png';
import CakesButton from './Assets/CakesButton_64x.png';
import PiesButton from './Assets/PiesButton_64x.png';
import DonutsButton from './Assets/DonutsButton_64x.png';
import WafflesButton from './Assets/WafflesButton_64x.png';
import MiscButton from './Assets/MiscButton_64x.png';
import CoffeePressed from './Assets/CoffeePressed_64x.png';
import CakesPressed from './Assets/CakesPressed_64x.png';
import PiesPressed from './Assets/PiesPressed_64x.png';
import DonutsPressed from './Assets/DonutsPressed_64x.png';
import WafflesPressed from './Assets/WafflesPressed_64x.png';
import MiscPressed from './Assets/MiscPressed_64x.png';
import ShopWelcome from './Assets/ShopWelcome_384x.png';
import ReturnButton from './Assets/ReturnButton_64x.png';
import ReturnPressed from './Assets/ReturnPressed_64x.png';
import useSound from 'use-sound';
import chaChingSound from './Assets/cha-ching.mp3';
import wahWahSound from './Assets/wahwah.mp3';
// Wood button bases, pictures, font, and similar assets done by DustDFG
// Font: https://opengameart.org/content/pixel-art-wooden-font-by-narik-soulofkiran
// GUI: https://opengameart.org/content/pixel-art-wooden-gui-by-narik-soulofkiran


// This Allows a new image to be displayed while the user clicks an image button.
class ImageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPressed: false };
  }

  handleMouseDown = () => {
    this.setState({ isPressed: true });
  };

  handleMouseUp = () => {
    this.setState({ isPressed: false });
  };

  render() {
    const { isPressed } = this.state;
    const { defaultImage, pressedImage, altText, onClick } = this.props;

    return (
      <button className="image-button" 
              onMouseDown={this.handleMouseDown} 
              onMouseUp={this.handleMouseUp} 
              onMouseLeave={this.handleMouseUp} 
              onClick={onClick}>
        <img src={isPressed ? pressedImage : defaultImage} alt={altText} />
      </button>
    );
  }
}

function ItemButton({ itemImage, price, buyItem }) {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <button className={`item-button ${isPressed ? 'pressed' : ''}`}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onClick={() => buyItem(price)}>
      <img className="item-image" src={itemImage} alt="Item" />
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
  const [playChaChing] = useSound(chaChingSound); 
  const [playWhaWha] = useSound(wahWahSound); 


  useEffect(() => {
    getPoints(username).then((points) => setPoints(points));
  }, [username, showShop]);

  const toggleShop = () => {
    setShowShop(!showShop);
  };

  const buyItem = async (cost) => {
    if (points >= cost) {
      const success = await addPoints(username, -cost);
      if (success) {
        const updatedPoints = await getPoints(username);
        setPoints(updatedPoints);
        playChaChing(); // Play the sound upon successful purchase
        addItem(username, selectedTab);
        alert(`Item purchased! You now have ${updatedPoints} ${updatedPoints === 1 ? 'coin' : 'coins'} remaining.`);
      } else {
        alert('There was an issue with the transaction.');
      }
    } else {
      playWhaWha();
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
    case 'coffee': itemsToDisplay = coffeeItems; break;
    case 'cakes': itemsToDisplay = cakeItems; break;
    case 'pies': itemsToDisplay = pieItems; break;
    case 'donuts': itemsToDisplay = donutItems; break;
    case 'waffles': itemsToDisplay = waffleItems; break;
    case 'misc': itemsToDisplay = miscItems; break;
  }


  // Allows for autoscroll on shop-tab click.
  const shopItemsRef = useRef(null);
  const autoScroll = (setTab) => {
    return () => {
      shopItemsRef.current.scrollIntoView({ behavior: 'smooth' });
      setTab();
    };
  };

  return (
    <div className="game-world">
      <button className="shop-button" onClick={toggleShop}>Shop</button>
      
      {showShop && (
        <div className="shop-fullscreen">
          <div className="shop-content">
            <div className="shop-container">
              <img src={ShopWelcome} alt="Shop - Buy Below."/>
              <div className="shop-items">
                <div className="shop-tabs">
                  <ImageButton defaultImage={CoffeeButton} pressedImage={CoffeePressed} altText="Coffee" onClick={autoScroll(() => setSelectedTab('coffee'))} />
                  <ImageButton defaultImage={CakesButton} pressedImage={CakesPressed} altText="Cakes" onClick={autoScroll(() => setSelectedTab('cakes'))} />
                  <ImageButton defaultImage={PiesButton} pressedImage={PiesPressed} altText="Pies" onClick={autoScroll(() => setSelectedTab('pies'))} />
                  <ImageButton defaultImage={DonutsButton} pressedImage={DonutsPressed} altText="Donuts" onClick={autoScroll(() => setSelectedTab('donuts'))} />
                  <ImageButton defaultImage={WafflesButton} pressedImage={WafflesPressed} altText="Waffles" onClick={autoScroll(() => setSelectedTab('waffles'))} />
                  <ImageButton defaultImage={MiscButton} pressedImage={MiscPressed} altText="Misc" onClick={autoScroll(() => setSelectedTab('misc'))} />
                </div>

                <div className="shop-items" ref={shopItemsRef}>
                  {itemsToDisplay.map((item, index) => (
                    <ItemButton key={index} itemImage={item.image} price={item.price} buyItem={buyItem} />
                  ))}
                </div>
              </div>
              <ImageButton defaultImage={ReturnButton} pressedImage={ReturnPressed} altText="Return" onClick={toggleShop} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopButton;
