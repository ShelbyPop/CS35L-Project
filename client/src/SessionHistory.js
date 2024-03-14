import React from 'react';
import './Leaderboard.css'; 
import { formatTime, formatDate } from './FormatDate.js';

/**
 * Displays a table of user sessions including user names, start times, end times, and session lengths
 * Uses `formatTime` and `formatDate` for displaying times and dates in a readable format
 * 
 * @param {*} { data }
 * @return {*} 
 */
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
            <td>{formatDate(item.startTime)}</td>
            <td>{formatDate(item.endTime)}</td>
            <td>{formatTime(item.sessionLength)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionHistory;
