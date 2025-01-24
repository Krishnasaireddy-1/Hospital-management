// import React, { useEffect, useState } from 'react';

// function Dashboard({ username }) {
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //console.log(`${username} dashboard`);

//   useEffect(() => {
//     if (!username) return; // If no username, don't fetch data

//     const fetchUserInfo = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${username}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//             console.log(data)
//           setUserInfo(data); // Update state with user data
//         } else {
//           console.error('Failed to fetch user info');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [username]); // Re-fetch if username changes

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!userInfo) {
//     return <p>No user data available</p>;
//   }

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Welcome, {userInfo.user.name}!</p>
//       <p>Email: {userInfo.user['e-mail']}</p>
//       <p>Role: {userInfo.user.role}</p>
//       {/* Add more user-specific data as needed */}
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ username }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!username) return; // If no username, don't fetch data

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserInfo(data); // Update state with user data
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [username, navigate]); // Re-fetch if username changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userInfo) {
    return <p>No user data available</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {userInfo.user.name}!</p>
      <p>Email: {userInfo.user.email}</p>
      <p>Role: {userInfo.user.role}</p>
      {/* Add more user-specific data as needed */}
    </div>
  );
}

export default Dashboard;
