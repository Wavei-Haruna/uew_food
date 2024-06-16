import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth} from 'firebase/auth';

const AuthContext = React.createContext();


const auth = getAuth();

export function useAuth() {
  return useContext(AuthContext);
}
// below ia our provider function
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import React, { useEffect, useState } from 'react';

// export function useAuthHook() {
//   const auth = getAuth();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [checkingStatus, setCheckingStatus] = useState(true);
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true);
//       }
//       setCheckingStatus(false);
//     });
//   }, [auth]);
//   return { isLoggedIn, checkingStatus };
// }