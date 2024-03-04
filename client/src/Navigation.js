import React, { useState } from 'react';
import './Navigation.css'; // Make sure to style your popups and navigation

const PointsPopup = () => (
  <div className="popup">coming soon</div>
);

const HistoryPopup = () => (
  <div className="popup">coming soon</div>
);

const LeaderboardPopup = () => (
  <div className="popup">coming soon</div>
);

const Navigation = () => {
  const [activePopup, setActivePopup] = useState('');

  const showPopup = (popupName) => {
      // Toggle the popup visibility
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
          {activePopup === 'points' && <PointsPopup />}
          {activePopup === 'history' && <HistoryPopup />}
          {activePopup === 'leaderboard' && <LeaderboardPopup />}
      </div>
  );
};

export default Navigation;