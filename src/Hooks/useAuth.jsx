// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../Helpers/AuthContext'; // Adjust path if necessary

// Custom hook to use the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
