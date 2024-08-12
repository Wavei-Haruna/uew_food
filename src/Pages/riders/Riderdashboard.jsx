import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar'; // You can reuse the Sidebar component or customize it for riders
import TrackDeliveries from './TrackDelivery'; // Placeholder component for tracking deliveries
import ManageOrders from './ManageOrders'; // Placeholder component for managing orders
import Statistics from './Statistics';
import RiderProfileSettings from './RiderProfileSettings';

const RiderDashboard = () => {
  const [activeTab, setActiveTab] = useState('deliveries');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={`flex-1 p-6 mx-auto container transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {activeTab === 'deliveries' && <TrackDeliveries />}
        {activeTab === 'orders' && <ManageOrders />}
        {activeTab === 'reports' && <Statistics />}
        {activeTab === 'settings' && <RiderProfileSettings />}
      </div>
      {/* Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-20 p-2 bg-yellow-600 text-white rounded-full md:hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default RiderDashboard;
