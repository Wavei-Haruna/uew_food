import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const UserOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      setLoading(true);
      try {
        const ordersQuery = query(
          collection(db, 'orders'),
          where('customerId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(ordersQuery);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Orders',
          text: 'An error occurred while fetching your orders. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders(orders.filter(order => order.id !== orderId));

      Swal.fire({
        icon: 'success',
        title: 'Order Cancelled',
        text: 'Your order has been successfully cancelled.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Cancelling Order',
        text: 'An error occurred while cancelling your order. Please try again.',
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return <p className="text-center text-lg font-semibold text-gray-600">You have no orders.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Item Name</p>
              <p className="text-lg font-medium">{order.itemName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-lg font-medium">Ghc{order.itemPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <p className="text-lg font-medium">{order.orderStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ordered At</p>
              <p className="text-lg font-medium">{order.orderedAt.toDate().toLocaleString()}</p>
            </div>
          </div>
          <button
            onClick={() => handleCancelOrder(order.id)}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
