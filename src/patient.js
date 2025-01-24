import React, { useEffect, useState } from 'react';
import { Link, useLocation, Routes, Route, useNavigate } from 'react-router-dom';

import PatientDashboard from  './patientdash'; // Replace with your actual component
import PatientSchedule from  './patientschedule';// Replace with your actual component
import PatientProblems from './problems';// Replace with your actual component
import PatientSettings from './patientsettings';// Replace with your actual component
//import './Patient.css';
console.log("hi patient")
function Patient() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      
    if (userInfo && userInfo.role === 'patient') {
      setUsername(userInfo.username);
      setRole(userInfo.role);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login if not authenticated or not a patient
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="patient-container">
      <nav className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>
            <Link to={`/patient/${username}/dashboard`} className={location.pathname.includes('dashboard') ? 'active' : ''}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={`/patient/${username}/problems`} className={location.pathname.includes('problems') ? 'active' : ''}>
              Problems
            </Link>
          </li>
          <li>
            <Link to={`/patient/${username}/schedule`} className={location.pathname.includes('schedule') ? 'active' : ''}>
              Schedule
            </Link>
          </li>
          <li>
            <Link to={`/patient/${username}/settings`} className={location.pathname.includes('settings') ? 'active' : ''}>
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
        <h1 className="welcome-header">Welcome, {username}!</h1>
        <div className="content-wrapper">
          <Routes>
            <Route path="dashboard" element={<PatientDashboard username={username} />} />
            <Route path="problems" element={<PatientProblems username={username} />} />
            <Route path="schedule" element={<PatientSchedule username={username} />} />
            <Route path="settings" element={<PatientSettings username={username} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Patient;
