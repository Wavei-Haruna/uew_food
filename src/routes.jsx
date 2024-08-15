import React from 'react';
import Home from './Pages/Home';
import HowItWorks from './Sections/HowItWorks';

import SignUp from './admin/SignUp';
import AdminDashboard from './admin/AdminDashboard';
import VendorDashboard from './Pages/vendor/VendorDashboard';
import RiderDashboard from './Pages/riders/Riderdashboard';
import CreateOrderPage from './Pages/orders/CreateOrder';
import PrivateRoute from './Components/PrivateRoute'; // Adjust path if necessary
import Navbar from './Components/Navbar';


<Navbar/>
export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'how-it-works',
    element: <HowItWorks />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },


  
  {
    path: 'admin',
    element: <PrivateRoute requiredRole="admin" />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
    ],
  },
  {
    path: 'order/*',
    element: <PrivateRoute />,
    children: [
      { path: 'create', element: <CreateOrderPage /> },
    ],
  },
  {
    path: 'vendor',
    element: <PrivateRoute requiredRole="Vendor" />,
    children: [
      { path: 'dashboard', element: <VendorDashboard /> },
    ],
  },
  {
    path: 'rider',
    element: <PrivateRoute requiredRole="Rider" />,
    children: [
      { path: 'dashboard', element: <RiderDashboard /> },
    ],
  },
];
