import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import Loader from '../Components/Loader';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders from the 'orders' collection
        const ordersQuery = collection(db, 'orders');
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

    const fetchRiders = async () => {
      try {
        const ridersQuery = query(
          collection(db, 'users'),
          where('role', '==', 'Rider')
        );
        const querySnapshot = await getDocs(ridersQuery);
        const ridersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRiders(ridersList);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Riders',
          text: error.message,
          showConfirmButton: true,
        });
      }
    };

    fetchOrders();
    fetchRiders();
  }, []);

  const handleAssign = async (orderId) => {
    if (!selectedRider) {
      Swal.fire({
        icon: 'warning',
        title: 'No Rider Selected',
        text: 'Please select a rider to assign the order.',
        showConfirmButton: true,
      });
      return;
    }

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        riderId: selectedRider,
        riderAssigned: true,
      });

      Swal.fire({
        icon: 'success',
        title: 'Order Assigned',
        text: 'The order has been successfully assigned to the rider.',
        showConfirmButton: true,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Assigning Order',
        text: error.message,
        showConfirmButton: true,
      });
      console.log(error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await deleteDoc(orderRef);
      
      setOrders(orders.filter(order => order.id !== orderId));

      Swal.fire({
        icon: 'success',
        title: 'Order Deleted',
        text: 'The order has been successfully deleted.',
        showConfirmButton: true,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Deleting Order',
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
      <h2 className="text-2xl font-bold mb-4 text-gray-600 font-menu">Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Customer Name</p>
              <p className="text-lg font-medium font-menu text-primary">{order.customerName}</p>
              <p className="text-lg font-medium font-menu text-primary">{order.itemName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer ID</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.customerId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-lg font-medium text-gray-500 font-menu">Ghc{order.itemPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Location</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.customerLocation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Phone</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <p className="text-lg font-medium text-gray-500 font-menu">{order.orderStatus}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <label htmlFor="riderSelect" className="block text-sm font-medium text-gray-700">
                Assign to Rider
              </label>
              <select
                id="riderSelect"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedRider}
                onChange={(e) => setSelectedRider(e.target.value)}
              >
                <option value="">Select a Rider</option>
                {riders.map((rider) => (
                  <option key={rider.id} value={rider.id}>
                    {rider.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAssign(order.id)}
                className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Assign Order
              </button>
            </div>
            <button
              onClick={() => handleDelete(order.id)}
              className="mt-4 h-8 w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
