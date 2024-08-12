import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loader';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the user is authenticated before fetching orders
    if (!currentUser) {
      Swal.fire({
        icon: 'error',
        title: 'Not Authenticated',
        text: 'You must be logged in to manage orders.',
      });
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        // Fetch only orders assigned to the current rider
        const ordersQuery = query(
          collection(db, 'orders'),
          where('riderId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(ordersQuery);
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Orders',
          text: error.message,
          showConfirmButton: true,
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  const handleMarkAsDelivered = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        orderStatus: 'Delivered',
      });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, orderStatus: 'Delivered' } : order
        )
      );

      Swal.fire({
        icon: 'success',
        title: 'Order Delivered',
        text: 'The order has been marked as delivered.',
        showConfirmButton: true,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Order',
        text: error.message,
        showConfirmButton: true,
      });
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full font-menu">
        <Loader />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold text-gray-600">No orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-600 font-menu">Manage Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="text-lg font-medium font-menu text-primary">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Phone</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vendor Name</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vendor Phone</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.vendorPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.orderStatus}</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleMarkAsDelivered(order.id)}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={order.orderStatus === 'Delivered'}
            >
              Mark as Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
