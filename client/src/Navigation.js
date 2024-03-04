import React, { useState } from 'react';
import './Navigation.css'; // Make sure to style your popups and navigation

const PointsPopup = ({ points }) => ( // Accept points as a prop for PointsPopup
  <div className="popup">Coming soon{points}</div>
);

const HistoryPopup = () => (
  <div className="popup">Coming soon</div>
);

const LeaderboardPopup = () => (
  <div className="popup">Coming soon</div>
);

const Navigation = ({ points, onAddPoints }) => {
  const [activePopup, setActivePopup] = useState('');

  const showPopup = (popupName) => {
      if (activePopup === popupName) {
          setActivePopup(''); // Close the popup if it's already open
      } else {
          setActivePopup(popupName); // Open the requested popup
      }
  };

  return (
      <div>
          <nav className="nav">
              <button onClick={() => showPopup('points')}>Points</button>
              <button onClick={() => showPopup('history')}>History</button>
              <button onClick={() => showPopup('leaderboard')}>Leaderboard</button>
          </nav>
          {activePopup === 'points' && <PointsPopup points={points} />}
          {activePopup === 'history' && <HistoryPopup />}
          {activePopup === 'leaderboard' && <LeaderboardPopup />}
      </div>
  );
};

export default Navigation;