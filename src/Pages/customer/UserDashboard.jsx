import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import { FaUser, FaBox, FaTimesCircle } from 'react-icons/fa';
import Navbar from '../../Components/Navbar';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (currentUser) {
          console.log('This is the current user:', currentUser);
          const ordersQuery = query(
            collection(db, 'orders'),
            where('customerId', '==', currentUser.uid)
          );
          const querySnapshot = await getDocs(ordersQuery);
          const ordersList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersList);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Orders',
          text: error.message,
          showConfirmButton: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleCancelOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await deleteDoc(orderRef);

      setOrders(orders.filter(order => order.id !== orderId));

      Swal.fire({
        icon: 'success',
        title: 'Order Canceled',
        text: 'Your order has been successfully canceled.',
        showConfirmButton: true,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Canceling Order',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center my-12">
          <FaUser className="mr-2 text-blue-500" /> Welcome, {currentUser?.data?.name}
        </h2>

        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaBox className="mr-2 text-green-500" /> Your Orders
        </h3>

        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">{order.itemName}</p>
                    <p className="text-gray-500">Price: Ghc{order.itemPrice}</p>
                    <p className="text-gray-500">Status: {order.orderStatus}</p>
                  </div>
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <FaTimesCircle size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDashboard;
