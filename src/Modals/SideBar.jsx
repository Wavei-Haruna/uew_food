import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-blue-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <ul className="mt-6">
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'vendors' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => setActiveTab('vendors')}
          >
            Create Vendor
          </li>
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'riders' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => setActiveTab('riders')}
          >
            Create Rider
          </li>
          {console.log(activeTab)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
