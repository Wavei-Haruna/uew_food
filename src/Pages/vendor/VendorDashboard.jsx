import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ManageOrders from './ManageItems'; // Placeholder component for managing orders

// import ProfileSettings from './ProfileSettings'; // Placeholder component for updating profile
import Statistics from './Statistics';
import ProfileSettings from './ProfileSettings';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {/* {activeTab === 'inventory' && <ManageInventory />} */}
        {activeTab === 'orders' && <ManageOrders />}
        {/* {activeTab === 'reports' && <GenerateReports />} */}
        {activeTab === 'settings' && <ProfileSettings />}
        {activeTab === 'statistics' && <Statistics />}
      </div>
    </div>
  );
};

export default VendorDashboard;
