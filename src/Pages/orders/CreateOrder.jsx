import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { FaCediSign } from 'react-icons/fa6';

const CreateOrderPage = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching items:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching items. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleBuyItem = async (item) => {
    if (!currentUser) {
      Swal.fire({
        icon: 'error',
        title: 'Not Authenticated',
        text: 'You must be logged in to place an order.',
      });
      navigate('/login');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const orderData = {
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        customerId: currentUser.uid,
        customerPhone: userData.phone,
        customerLocation: userData.location,
        customerName: userData.name,
        orderStatus: 'Pending',
        orderedAt: new Date(),
      };

      await addDoc(collection(db, 'orders'), orderData);

      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: `Your order for ${item.name} has been placed successfully.`,
      });
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while placing your order. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {loading || authLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Available Food Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-xl font-semibold mb-4 flex items-center">
                  <FaCediSign className="mr-1" /> {item.price}
                </p>
                <button
                  onClick={() => handleBuyItem(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateOrderPage;
