
// export default Doctor;
// import React, { useEffect } from 'react';
// import { Link, useParams, useLocation, Routes, Route, useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';  // Import useUser hook from the context
// import Dashboard from './Dashboard';
// import Appointments from './Appointments';
// import Schedules from './Schedules';
// import Settings from './Settings';

// // Import the CSS file
// import './Doctor.css';

// function Doctor() {
//   const { username } = useParams();  // Extract username from URL params
//   const { username: contextUsername, setUsername, setIsAuthenticated } = useUser();  // Access context for username and authentication
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Sync username with context if necessary
//   useEffect(() => {
//     if (username && username !== contextUsername) {
//       setUsername(username); // Set context username
//     }
//   }, [username, contextUsername, setUsername]);

//   // If not authenticated, redirect to login
//   useEffect(() => {
//     if (!contextUsername) {
//       setIsAuthenticated(false);
//       navigate('/login');
//     }
//   }, [contextUsername, navigate, setIsAuthenticated]);

//   return (
//     <div className="doctor-container">
//       {/* Sidebar */}
//       <nav className="sidebar">
//         <h3>Menu</h3>
//         <ul>
//           <li><Link to="/doctor/dashboard" className={location.pathname.includes('dashboard') ? 'active' : ''}>Dashboard</Link></li>
//           <li><Link to="/doctor/appointments" className={location.pathname.includes('appointments') ? 'active' : ''}>New Appointments</Link></li>
//           <li><Link to="/doctor/schedules" className={location.pathname.includes('schedules') ? 'active' : ''}>Schedules</Link></li>
//           <li><Link to="/doctor/settings" className={location.pathname.includes('settings') ? 'active' : ''}>Settings</Link></li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="main-content">
//         <h1 className="welcome-header">Welcome, {`Dr. ${contextUsername || username}`}!</h1>
//         <div className="content-wrapper">
//           {/* Routes are rendered here */}
//           <Routes>
//             <Route path="dashboard" element={<Dashboard username={contextUsername || username} />} />
//             <Route path="appointments" element={<Appointments username={contextUsername || username} />} />
//             <Route path="schedules" element={<Schedules username={contextUsername || username} />} />
//             <Route path="settings" element={<Settings username={contextUsername || username} />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Doctor;
import React, { useEffect, useState } from 'react';
import { Link, useLocation, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import Schedules from './Schedules';
import Settings from './Settings';
import './Doctor.css';

function Doctor() {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user info exists in localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedAuthStatus = localStorage.getItem('isAuthenticated');

    // If not authenticated, redirect to login
    if (!storedUserInfo || storedAuthStatus !== 'true') {
      setIsAuthenticated(false); // Ensure isAuthenticated state reflects that the user is not logged in
      navigate('/login'); // Redirect to login page if not authenticated
    } else {
      const userInfo = JSON.parse(storedUserInfo);
      setUsername(userInfo.username);
      setIsAuthenticated(true); // Update the state for authenticated user
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user info and authentication status from localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false); // Clear authentication state in the component
    navigate('/login'); // Redirect to login page after logout
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering the Doctor component if not authenticated
  }

  return (
    <div className="doctor-container">
      <nav className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>
            <Link
              to={`/doctor/${username}/dashboard`}
              className={location.pathname.startsWith(`/doctor/${username}/dashboard`) ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={`/doctor/${username}/appointments`}
              className={location.pathname.startsWith(`/doctor/${username}/appointments`) ? 'active' : ''}
            >
              New Appointments
            </Link>
          </li>
          <li>
            <Link
              to={`/doctor/${username}/schedules`}
              className={location.pathname.startsWith(`/doctor/${username}/schedules`) ? 'active' : ''}
            >
              Schedules
            </Link>
          </li>
          <li>
            <Link
              to={`/doctor/${username}/settings`}
              className={location.pathname.startsWith(`/doctor/${username}/settings`) ? 'active' : ''}
            >
              Settings
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <h1 className="welcome-header">Welcome, {`Dr. ${username}`}!</h1>
        <div className="content-wrapper">
          <Routes>
            <Route path="dashboard" element={<Dashboard username={username} />} />
            <Route path="appointments" element={<Appointments username={username} />} />
            <Route path="schedules" element={<Schedules username={username} />} />
            <Route path="settings" element={<Settings username={username} />} />
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
