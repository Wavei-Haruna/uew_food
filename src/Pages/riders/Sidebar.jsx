import React from 'react';
import { FaTruck, FaListAlt, FaClipboardList, FaUserEdit } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, activeTab, setActiveTab }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative w-64 bg-yellow-900 flex flex-col justify-between items-center text-white transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mt-12">Rider Dashboard</h2>
        <ul className="mt-6">
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'deliveries' ? 'bg-yellow-700' : 'hover:bg-yellow-800'}`}
            onClick={() => setActiveTab('deliveries')}
          >
            <FaTruck className="mr-2" />
            Track Deliveries
          </li>
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'orders' ? 'bg-yellow-700' : 'hover:bg-yellow-800'}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaListAlt className="mr-2" />
            Manage Orders
          </li>
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'reports' ? 'bg-yellow-700' : 'hover:bg-yellow-800'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaClipboardList className="mr-2" />
            Reports
          </li>
        </ul>
        <div className="mt-16">
          <h3
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'settings' ? 'bg-yellow-700' : 'hover:bg-yellow-800'}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaUserEdit className="mr-2" />
            Profile Settings
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
