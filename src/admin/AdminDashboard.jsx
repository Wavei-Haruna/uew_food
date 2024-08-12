import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CreateRider from './CreateRider';
import CreateVendor from './vendors/CreateVendor';
import AdminStatistics from './AdminStatistics';
import OrderDetails from './Orderdetials';
import ProfileSettings from './ProfileSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('vendors');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === 'vendors' && <CreateVendor />}
        {activeTab === 'riders' && <CreateRider />}
        {activeTab === 'orders' && <OrderDetails/>}
        {activeTab === 'inventory' && <div>Inventory Management Placeholder</div>}
        {activeTab === 'reports' &&  <AdminStatistics/>}
        {activeTab === 'profileUpdate' && <ProfileSettings/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
