import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import CreateRider from './CreateRider';
import CreateVendor from './vendors/CreateVendor';
import AdminStatistics from './AdminStatistics';
import OrderDetails from './Orderdetials';
import ProfileSettings from './ProfileSettings';
import Navbar from '../Components/Navbar';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('vendors');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Navbar/> */}
      <Sidebar isSidebarOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={`flex-1 p-6 container mx-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* {activeTab === 'vendors' && <CreateVendor />}
        {activeTab === 'riders' && <CreateRider />} */}
        {activeTab === 'orders' && <OrderDetails />}
        {activeTab === 'inventory' && <div>Inventory Management Placeholder</div>}
        {activeTab === 'reports' && <AdminStatistics />}
        {activeTab === 'profileUpdate' && <ProfileSettings />}
      </div>
      {/* Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-20 p-2 bg-blue-600 text-white rounded-full md:hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  );
};

export default AdminDashboard;
