import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import { FaCediSign } from 'react-icons/fa6';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import useAuth from '../../Hooks/useAuth'; // Import useAuth hook

const StatisticsPage = () => {
  const { currentUser } = useAuth(); // Get currentUser from useAuth hook
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!currentUser) return; // Wait for the user to be authenticated

      setLoading(true);
      try {
        // Step 1: Get all items created by this vendor
        const itemsQuery = query(collection(db, 'items'), where('createdBy', '==', currentUser.uid));
        const itemsSnapshot = await getDocs(itemsQuery);
        const vendorItemIds = itemsSnapshot.docs.map(doc => doc.id);

        if (vendorItemIds.length === 0) {
          throw new Error('No items found for this vendor');
        }

        // Step 2: Get orders that contain these items
        const ordersQuery = query(collection(db, 'orders'), where('itemId', 'in', vendorItemIds));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersList = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Step 3: Calculate statistics
        const totalOrders = ordersList.length;
        const pendingOrders = ordersList.filter(order => order.orderStatus === 'Pending').length;
        const completedOrders = ordersList.filter(order => order.orderStatus === 'Delivered').length;
        const canceledOrders = ordersList.filter(order => order.orderStatus === 'Canceled').length;

        // Convert itemPrice to number and calculate total revenue
        const totalRevenue = ordersList.reduce((sum, order) => {
          const price = Number(order.itemPrice);
          return sum + (isNaN(price) ? 0 : price);
        }, 0);

        setOrders(ordersList);
        setStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          canceledOrders,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'We had an issue with your statistics',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [currentUser]);

  // Data for charts
  const orderStatusData = {
    labels: ['Pending', 'Completed', 'Canceled'],
    datasets: [
      {
        label: 'Order Status',
        data: [stats.pendingOrders, stats.completedOrders, stats.canceledOrders],
        backgroundColor: ['#ffcc00', '#4caf50', '#f44336'],
      },
    ],
  };

  const revenueData = {
    labels: orders.map(order => order.itemName),
    datasets: [
      {
        label: 'Revenue by Item',
        data: orders.map(order => Number(order.itemPrice)),
        backgroundColor: '#2196f3',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Statistics for Vendor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Total Orders</h3>
              <p className="text-3xl font-semibold">{stats.totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Total Revenue</h3>
              <p className="text-3xl font-semibold flex items-center">
                <FaCediSign className="mr-1" /> {stats.totalRevenue}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Order Status</h3>
              <Pie data={orderStatusData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold mb-4">Revenue by Item</h3>
              <Bar data={revenueData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
