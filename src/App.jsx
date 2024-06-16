import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="text-center font-menu bg-gray-100">
      <Navbar />
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
}

export default App;
