import React, { navigate,useEffect, useState } from 'react';

function Settings({username}) {
  const [userInfo, setUserInfo] = useState(null);

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
      } 
    };

    fetchUserInfo();
  }, [username, navigate]); 

  return (
    <div>
      <h2>Settings</h2>
      <p>Customize your account settings here.</p>
      {userInfo ? (
        <div>
          <h3>User Details</h3>
          <ul>
            <li><strong>Username:</strong> {userInfo.user.name}</li>
            <li><strong>Role:</strong> {userInfo.user.role}</li>
            <li><strong>Email:</strong> {userInfo.user.mobile}</li>
            {/* Add more fields here as needed */}
          </ul>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Settings;
