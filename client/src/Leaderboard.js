import React from 'react';
import './Leaderboard.css'; 

/**
 * Leaderboard displays table of users and their points
 * It takes an array of users and sorts them by points
 * 
 * @component
 * 
 * @param {*} { data } - Array of users
 * @param {*} data._id - Each user's ID
 * @param {*} data.username - Username of each user
 * @param {*} data.points - The points of a user
 * 
**/
const Leaderboard = ({ data }) => {
  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.username}</td>
            <td>{item.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
