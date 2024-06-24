import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthHook } from '../Hooks/useAuthHook';
import { toast } from 'react-toastify';

export default function PrivateRoute({ allowedRoles }) {
  const { isLoggedIn, checkingStatus, userRole } = useAuthHook();

  if (checkingStatus) {
    return (
      <div className="absolute top-0 z-10 m-0 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-70">
        Loading
      </div>
    );
  }

  if (!isLoggedIn) {
    toast.warn('Please login');
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    toast.warn('Unauthorized access');

    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin-dashboard" />;
      case 'vendor':
        return <Navigate to="/vendor-dashboard" />;
      case 'rider':
        return <Navigate to="/rider-dashboard" />;
      default:
        return <Navigate to="/dashboard" />;
    }
  }

  return <Outlet />;
}
