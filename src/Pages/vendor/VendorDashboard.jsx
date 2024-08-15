import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import ManageOrders from './ManageItems'; // Placeholder component for managing orders
import ProfileSettings from './ProfileSettings';
import StatisticsPage from './StatisticsPage';
import Navbar from '../../Components/Navbar';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
       {/* <Navbar/> */}
      <Sidebar isSidebarOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={`flex-1 p-6 mx-auto container transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {activeTab === 'orders' && <ManageOrders />}
        {activeTab === 'settings' && <ProfileSettings />}
        {activeTab === 'statistics' && <StatisticsPage />}
      </div>
      {/* Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-20 p-2 bg-green-600 text-white rounded-full md:hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default VendorDashboard;
