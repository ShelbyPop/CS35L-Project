// src/Leaderboard.js

import React from 'react'

import './Leaderboard.css'; // Import the CSS file for styling

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
    )
}

export default Leaderboard;
