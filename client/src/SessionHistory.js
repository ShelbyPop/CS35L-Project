import React from 'react';
import './Leaderboard.css'; // Import the CSS file for styling
import { formatTime } from './FormatDate.js';

const SessionHistory = ({ data }) => {
  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Session Length</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.username}</td>
            <td>{item.startTime}</td>
            <td>{item.endTime}</td>
            <td>{formatTime(item.sessionLength)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionHistory;
