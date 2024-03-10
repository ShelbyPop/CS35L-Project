import React, { useEffect, useState } from 'react';
import './Navigation.css'; // Make sure to style your popups and navigation
import SessionHistory from './SessionHistory.js';
import Leaderboard from './Leaderboard.js';
import { getPoints } from './PointsRequests.js';
import { parseUserSessions } from './SessionRequests.js';

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

const HistoryPopup = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([])
  
  // Update data on render & on query update
  useEffect(() => {
    async function fetchSessions() {
      const res = await fetch(`http://localhost:5050/sessions/history?query=${query}`);
      const data = await res.json();
      setData(data);
    };
    fetchSessions();
  }, [query]);
  
  return (
    <>
    <div className="leaderboard-container" >
      <input placeholder="Search" className="search" onChange={(event) => setQuery(event.target.value)}/>
    </div>
      <SessionHistory data={data ?? []} />
    </>
  );
};

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

const UserStatsPopup = ({ username }) => {
  //const totalSessions = parseUserSessions(username).numSessions;
  const [stats, setStats] = useState(null);
  useEffect(() => {
    parseUserSessions(username).then((stats) => setStats(stats));
  }, [username]);

  if (username === null) {
    return (<div className="popup">Not logged in!</div>);
  } else if (stats === null || stats.totalSessions === 0) {
    return (<div className="popup">No sessions yet</div>);
  } else {
    console.log(`total sessions: ${stats.totalSessions}`);
    return (
      <div className="popup">
        <p>Most recent session: {stats.lastSession}</p>
        <p>Total sessions: {stats.totalSessions}</p>
        <p>Total time spent focusing: {stats.totalFocusTime} seconds</p>
        <p>Average session length: {stats.averageSessionLength} seconds</p>
      </div>
    );
  }
};

const Navigation = ({ username }) => {
  const [activePopup, setActivePopup] = useState('');

  const showPopup = (popupName) => {
      if (activePopup === popupName) {
          setActivePopup(''); // Close the popup if it's already open
      } else {
          setActivePopup(popupName); // Open the requested popup
      }
  };
  
  // TODO: "Add 5 points" is temporary for testing, get rid of this before submitting
  return (
      <div>
          <nav className="nav">
              <button onClick={() => showPopup('points')}>Points</button>
              <button onClick={() => showPopup('history')}>History</button>
              <button onClick={() => showPopup('leaderboard')}>Leaderboard</button>
              <button onClick={() => showPopup('user stats')}>User Stats</button>
              {username && 
                <p>{username}</p>
              }
          </nav>
          {activePopup === 'points' && <PointsPopup username={username} />}
          {activePopup === 'history' && <HistoryPopup />}
          {activePopup === 'leaderboard' && <LeaderboardPopup />}
          {activePopup === 'user stats' && <UserStatsPopup username={username} />}
      </div>
  );
};

export default Navigation;