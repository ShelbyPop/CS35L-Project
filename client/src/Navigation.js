import React, { useEffect, useState } from 'react';
import './Navigation.css'; // Make sure to style your popups and navigation
import Leaderboard from './Leaderboard.js';

const PointsPopup = ({ points }) => ( // Accept points as a prop for PointsPopup
  <div className="popup">Coming soon{points}</div>
);

const HistoryPopup = () => (
  <div className="popup">Coming soon</div>
);

const LeaderboardPopup = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])
  
  // Update data on render & on query update
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`http://localhost:5050?query=${query}`);
      const data = await res.json();
      setData(data);
    };
    fetchUsers();
  }, [query]);
  
  return (
    <>
      <input placeholder="Search" className="search" onChange={(event) => setQuery(event.target.value)}/>
      <Leaderboard data={data ?? []} />
    </>
  );
};

const LifeTimeStatsPopup = () => (
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
              <button onClick={() => showPopup('lifetime stats')}>Lifetime Stats</button>

          </nav>
          {activePopup === 'points' && <PointsPopup points={points} />}
          {activePopup === 'history' && <HistoryPopup />}
          {activePopup === 'leaderboard' && <LeaderboardPopup />}
          {activePopup === 'lifetime stats' && <LifeTimeStatsPopup />}
      </div>
  );
};

export default Navigation;