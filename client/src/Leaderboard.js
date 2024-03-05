// src/Leaderboard.js

import React from 'react'

const Leaderboard = ({ data }) => {
  console.log(JSON.stringify(data));

  return (
    <table>
      <tbody>
        <tr>
          <th>User</th>
          <th>Points</th>
        </tr>
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

export default Leaderboard