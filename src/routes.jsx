import React from 'react';
import Home from './Pages/Home';
import HowItWorks from './Sections/HowItWorks';
import Menu from './Sections/Menu';
import SignUp from './Modals/SignUp';
import AdminDashboard from './Modals/AdminDashboard';
import PrivateRoute from './Components/PrivateRoute';
import UserDashboard from './Modals/UserDashboard';

export const routes = [
  {
    path: '/',
    element: <Home />},
    
      { path: 'how-it-works', element: <HowItWorks /> },
      { path: 'menu', element: <Menu /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'dashboard',
        element: <PrivateRoute allowedRoles={['user', 'admin']} />,
        children: [
          { path: '/dashboard', element: <UserDashboard/> }
        ]
      },
      {
        path: 'admin',
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
          { path: 'admin-dashboard', element: <AdminDashboard /> }
        ]
      }
    
];
