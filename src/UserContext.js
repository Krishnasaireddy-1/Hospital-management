// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create a context
// const UserContext = createContext();

// // Custom hook to use the User Context
// export const useUser = () => {
//   return useContext(UserContext);
// };

// // UserProvider component that will provide user data to the entire app
// export const UserProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Load user data from localStorage when the app is initialized
//   useEffect(() => {
//     const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
//     const storedAuthStatus = localStorage.getItem('isAuthenticated');
//     if (storedUserInfo && storedAuthStatus === 'true') {
//       setUserInfo(storedUserInfo);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Save user data to localStorage when it changes
//   useEffect(() => {
//     if (userInfo && isAuthenticated) {
//       localStorage.setItem('userInfo', JSON.stringify(userInfo));
//       localStorage.setItem('isAuthenticated', 'true');
//     }
//   }, [userInfo, isAuthenticated]);

//   // Logout function to clear user data from context and localStorage
//   const logout = () => {
//     setUserInfo(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('userInfo');
//     localStorage.removeItem('isAuthenticated');
//   };

//   return (
//     <UserContext.Provider value={{ userInfo, isAuthenticated, setUserInfo, setIsAuthenticated, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo, // Ensure this function is provided
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
    