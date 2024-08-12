import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication state to the entire app
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
  const [userRole, setUserRole] = useState(null); // State to hold user role
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Set up an authentication state observer and get user data
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Reference to the user document in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          // Fetch the user document
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fetchedUserRole = userData.role || 'user'; // Default role if not found
            console.log('User role fetched:', fetchedUserRole); // Log user role
            setCurrentUser({ ...user, role: fetchedUserRole });
            setUserRole(fetchedUserRole); // Set user role
          } else {
            console.error('No such document!');
            setCurrentUser(null);
            setUserRole(null);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
          setCurrentUser(null);
          setUserRole(null);
        }
      } else {
        // No user is signed in
        setCurrentUser(null);
        setUserRole(null);
      }
      // Set loading to false once the user data is fetched
      setLoading(false);
    });

    // Clean up the observer on unmount
    return unsubscribe;
  }, []);

  // Value to be passed down through the context
  const value = {
    currentUser,
    userRole,
    loading,
  };

  return (
    // Provide the authentication state to children components
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
