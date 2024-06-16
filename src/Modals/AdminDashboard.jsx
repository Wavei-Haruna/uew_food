import React, { useState } from 'react';
import Sidebar from './SideBar';
import CreateRider from './CreateRider';
import CreateVendor from './CreateVendor';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('vendors');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === 'vendors' && <CreateVendor />}
        {activeTab === 'riders' && <CreateRider />}
      </div>
    </div>
  );
};

export default AdminDashboard;
