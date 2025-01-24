import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ username }) {
  return (
    <div>
    <nav style={{ width: '200px', borderRight: '1px solid #ccc', padding: '20px' }}>
      <h3>Menu</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to={`/doctor/${username}/dashboard`}>Dashboard</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={`/doctor/${username}/appointments`}>New Appointents</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={`/doctor/${username}/schedules`}>Schedules</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to={`/doctor/${username}/settings`}>Settings</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Menu;
