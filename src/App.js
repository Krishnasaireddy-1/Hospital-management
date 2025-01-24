
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import patientdash from'./patientdash';
// import problems from './problems';
// import patientschedule from './patientschedule';
// import patientsettings from './patientsettings';
// import Login from './login';
// import Patient from './patient';
// import Doctor from './Doctor';
// import Dashboard from './Dashboard';
// import Appointments from './Appointments';
// import Schedules from './Schedules';
// import Settings from './Settings';

// function App() {
//   // Function to check authentication and role
//   const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';
//   const getUserInfo = () => JSON.parse(localStorage.getItem('userInfo'));

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Patient Route */}
//         <Route
//           path="/patient"
//           element={
//             isAuthenticated() && getUserInfo()?.role === 'patient' ? (
//               <Patient />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         console.log(isAuthenticated())
//         {/* Doctor Routes */}
//         <Route
//           path="/doctor"
//           element={
//             isAuthenticated() && getUserInfo()?.role === 'doctor' ? (
//               <Doctor />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="appointments" element={<Appointments />} />
//           <Route path="schedules" element={<Schedules />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         {/* Fallback Route */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './AuthContext';
// import Patientdash from './patientdash';
// import Problems from './problems';
// import Patientschedule from './patientschedule';
// import Patientsettings from './patientsettings';
// import Login from './login';
// import Patient from './patient';
// import Doctor from './Doctor';
// import Dashboard from './Dashboard';
// import Appointments from './Appointments';
// import Schedules from './Schedules';
// import Settings from './Settings';

// function App() {
//   const { isAuthenticated, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const ProtectedRoute = ({ role, children }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" />;
//     }
//     if (user?.role !== role) {
//       return <Navigate to="/login" />;
//     }
//     return children;
//   };

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/patient/*"
//             element={
//               <ProtectedRoute role="patient">
//                 <Patient />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<Patientdash />} />
//             <Route path="problems" element={<Problems />} />
//             <Route path="schedule" element={<Patientschedule />} />
//             <Route path="settings" element={<Patientsettings />} />
//           </Route>

//           <Route
//             path="/doctor/*"
//             element={
//               <ProtectedRoute role="doctor">
//                 <Doctor />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="appointments" element={<Appointments />} />
//             <Route path="schedules" element={<Schedules />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>

//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Correct import
import Patient from './patient';
import Doctor from './Doctor';
import Login from './login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Appointments from './Appointments';
import Schedules from './Schedules';
import Settings from './Settings';
import Patientdash from './patientdash';
import Problems from './problems';
import Patientschedule from './patientschedule';
import Patientsettings from './patientsettings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user info exists in localStorage on page load
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      // If user is authenticated, set the state
      if (userInfo?.role) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []); 
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route for Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes for Patient */}
          <Route
            path="/patient/:username/*"
            element={
              <ProtectedRoute role="patient">
                <Patient />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Patientdash />} />
            <Route path="problems" element={<Problems />} />
             <Route path="schedule" element={<Patientschedule />} />
             <Route path="settings" element={<Patientsettings />} />
             </Route>
          
          {/* Protected Routes for Doctor */}
          <Route
            path="/doctor/:username/*"
            element={
              <ProtectedRoute role="doctor">
                <Doctor />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes for Doctor */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="settings" element={<Settings />} />
            {/* Default Route if no sub-path is matched */}
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
