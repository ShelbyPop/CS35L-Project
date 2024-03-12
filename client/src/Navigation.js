import React, { useEffect, useState } from 'react';
import './Navigation.css'; // Make sure to style your popups and navigation
import SessionHistory from './SessionHistory.js';
import Leaderboard from './Leaderboard.js';
import { getPoints } from './PointsRequests.js';
import { parseUserSessions } from './SessionRequests.js';
import { allItems, getAllItemCounts } from './ItemRequests.js';

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
      <input placeholder="Search for user" className="search" onChange={(event) => setQuery(event.target.value)}/>
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

// Retrieve user stats from parseUserSessions & user item counts from getItemCounts
const UserStatsPopup = ({ username }) => {
    const [stats, setStats] = useState(null);
    const [itemCt, setItemCt] = useState(Array(allItems.length).fill(null));

    useEffect(() => {
        parseUserSessions(username).then((stats) => setStats(stats));
        getAllItemCounts(username).then((counts) => setItemCt(counts));
    }, [username]);

    if (username === null) {
        return <div className="user-popup">Not logged in!</div>;
    } else if (stats === null || stats.totalSessions === 0) {
        return (
            <div className="user-popup">
                <table className="user-stats-table">
                    <tbody>
                    <tr>
                        <td>No sessions yet</td>
                    </tr>
                    {allItems.map((item, index) => (
                        <tr key={index}>
                            <td>Total {item}:</td>
                            <td>{itemCt[index]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div className="user-popup">
                <table className="user-stats-table">
                    <tbody>
                    <tr>
                        <td>Most recent session:</td>
                        <td>{stats.lastSession}</td>
                    </tr>
                    <tr>
                        <td>Total sessions:</td>
                        <td>{stats.totalSessions}</td>
                    </tr>
                    <tr>
                        <td>Total time spent focusing:</td>
                        <td>{stats.totalFocusTime} seconds</td>
                    </tr>
                    <tr>
                        <td>Average session length:</td>
                        <td>{stats.averageSessionLength} seconds</td>
                    </tr>
                    {allItems.map((item, index) => (
                        <tr key={index}>
                            <td>Total {item}:</td>
                            <td>{itemCt[index]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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