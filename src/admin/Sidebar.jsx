import React from 'react';
import { FaTruck, FaStore, FaBoxOpen, FaListAlt, FaClipboardList, FaUserEdit } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, activeTab, setActiveTab }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative w-64 bg-blue-900 flex flex-col justify-between items-center text-white transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mt-12">Admin Dashboard</h2>
        <ul className="mt-6">
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'reports' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaClipboardList className="mr-2" />
            Overview
          </li>
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'orders' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaListAlt className="mr-2" />
            Orders
          </li>
          {/* <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'inventory' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaBoxOpen className="mr-2" />
            Inventory
          </li> */}
        </ul>
        <div className="mt-16">
          <h3
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'profileUpdate' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => setActiveTab('profileUpdate')}
          >
            <FaUserEdit className="mr-2" />
            Update Profile
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
