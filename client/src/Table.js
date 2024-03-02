// src/Table.js

import React from 'react'

const Table = ({ data }) => {
  console.log(JSON.stringify(data));

  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Username</th>
        </tr>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table