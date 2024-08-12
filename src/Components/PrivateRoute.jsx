import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const PrivateRoute = ({ requiredRole }) => {
  const { currentUser, userRole, loading } = useAuth();
  console.log('Private ROute is rendered')
  if (loading) {
    return <div className='text-black'>Loading...</div>; // You can replace this with your default loader
  }

  if (!currentUser) {
    Swal.fire({
      icon: 'warning',
      title: 'Unauthorized',
      text: 'You need to be logged in to access this page.',
      showConfirmButton: true,
    });
    return <Navigate to="/signup" replace />;
  }

  // Check if the user's role matches the required role
  if (requiredRole && userRole !== requiredRole) {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: `You don't have the required permissions to access this page.`,
      showConfirmButton: true,
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
