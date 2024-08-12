import React from 'react';
import { FaBoxOpen, FaListAlt, FaClipboardList, FaUserEdit } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { GrAnalytics } from 'react-icons/gr';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-green-900 flex flex-col justify-between items-center text-white">
      <div className="p-6 ">
        <h2 className="text-2xl font-bold">Vendor Dashboard</h2>
        <ul className="mt-6">
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'inventory' ? 'bg-green-700' : 'hover:bg-green-800'}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaBoxOpen className="mr-2" />
            Manage Inventory
          </li>
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'orders' ? 'bg-green-700' : 'hover:bg-green-800'}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaListAlt className="mr-2" />
            Manage Orders
          </li>
          <li
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'statistics' ? 'bg-green-700' : 'hover:bg-green-800'}`}
            onClick={() => setActiveTab('statistics')}
          >
            <GrAnalytics className="mr-2" />
            Statistics
          </li>
        </ul>
        <div className="mt-16">
          <h3
            className={`p-3 rounded cursor-pointer flex items-center ${activeTab === 'settings' ? 'bg-green-700' : 'hover:bg-green-800'}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaGear className="mr-2" />
            Settings
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
