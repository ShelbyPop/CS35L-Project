import React, { useEffect, useState } from 'react';
import './Navigation.css'; // Make sure to style your popups and navigation
import Leaderboard from './Leaderboard.js';
import { getPoints, addPoints } from './PointsRequests.js';

const PointsPopup = ({ username }) => {
  // Use these lines whenever you need a user's point total in a react component
  const [points, setPoints] = useState("");
  useEffect(() => {
    getPoints(username).then((points) => setPoints(points));
  }, [username]);

  console.log(`${points} points`);
  return (
    <div className="popup">{username ? `${points} points` : "Not logged in"}</div>
  );
};

// Or, if you can use async function (e.g. in a listener like this), do it this way
const handleGetPoints = async (username) => {
  const result = await getPoints(username);
  (result === null) ? alert("Bad request") : alert(`${username} has ${result} points`);
};

const HistoryPopup = () => (
  <div className="popup">Coming soon</div>
);

const LeaderboardPopup = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])
  
  // Update data on render & on query update
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`http://localhost:5050/users/leaderboard?query=${query}`);
      const data = await res.json();
      setData(data);
    };
    fetchUsers();
  }, [query]);
  
  return (
    <>
    <div className="leaderboard-container" >
      <input placeholder="Search" className="search" onChange={(event) => setQuery(event.target.value)}/>
    </div>
      <Leaderboard data={data ?? []} />

    </>
  );
};

const LifeTimeStatsPopup = () => (
  <div className="popup">Coming soon</div>
);

const Navigation = ({ username }) => {
  const [activePopup, setActivePopup] = useState('');

  const showPopup = (popupName) => {
      if (activePopup === popupName) {
          setActivePopup(''); // Close the popup if it's already open
      } else {
          setActivePopup(popupName); // Open the requested popup
      }
  };
  
  // TODO: hide user body element completely when not logged in, so that other buttons are centered
  // TODO: "Add 5 points" is temporary for testing, get rid of this before submitting
  return (
      <div>
          <nav className="nav">
              <button onClick={() => showPopup('points')}>Points</button>
              <button onClick={() => showPopup('history')}>History</button>
              <button onClick={() => showPopup('leaderboard')}>Leaderboard</button>
              <button onClick={() => showPopup('lifetime stats')}>Lifetime Stats</button>
              <button onClick={() => handleGetPoints(username)}>Check points</button>
              <button onClick={() => addPoints(username, 5)}>Add 5 points</button>
              <p>{username}</p>
          </nav>
          {activePopup === 'points' && <PointsPopup username={username} />}
          {activePopup === 'history' && <HistoryPopup />}
          {activePopup === 'leaderboard' && <LeaderboardPopup />}
          {activePopup === 'lifetime stats' && <LifeTimeStatsPopup />}
      </div>
  );
};

export default Navigation;