import React, { useState } from 'react';
import Sidebar from './Sidebar'; // You can reuse the Sidebar component or customize it for riders
import TrackDeliveries from './TrackDelivery'; // Placeholder component for tracking deliveries
import ManageOrders from './ManageOrders'; // Placeholder component for managing orders
import Statistics from './Statistics';
import RiderProfileSettings from './RiderProfileSettings';

const RiderDashboard = () => {
  const [activeTab, setActiveTab] = useState('deliveries');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === 'deliveries' && <TrackDeliveries />}
        {activeTab === 'orders' && <ManageOrders />}
        {activeTab === 'reports' && <Statistics />}
        {activeTab === 'settings' && <RiderProfileSettings/>}
      </div>
    </div>
  );
};

export default RiderDashboard;
