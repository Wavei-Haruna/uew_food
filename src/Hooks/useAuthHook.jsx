import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function useAuthHook() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        
        try {
          // Fetch the user's role from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserRole(userDocSnap.data().role || 'user');
          } else {
            setUserRole('user'); // Default role if not found
            console.log(userRole)
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
          setUserRole('user'); // Handle error by setting default role
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { isLoggedIn, checkingStatus, userRole };
}
