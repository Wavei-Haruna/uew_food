import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loader from '../../Components/Loader';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { FaCediSign } from 'react-icons/fa6';

const ManageItems = () => {
  const { currentUser, userRole, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', picture: '' });
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (authLoading) {
        return; // Wait until auth loading is done
      }

      setLoading(true); // Start loading when fetching items
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching items: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching items. Please try again.',
        });
      } finally {
        setLoading(false); // Stop loading once items are fetched
      }
    };

    fetchItems();
  }, [authLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (authLoading || !userRole) {
      Swal.fire({
        icon: 'error',
        title: 'Not Authenticated',
        text: 'You are not authenticated yet. Please wait or reload the page.',
      });
      return; // Prevent adding if role is not ready
    }

    if (userRole !== 'admin' && userRole !== 'Vendor') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to add items.',
      });
      return;
    }

    setLoading(true);

    let pictureUrl = '';

    if (imageFile) {
      const imageRef = ref(storage, `items/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      pictureUrl = await getDownloadURL(imageRef);
    }

    try {
      await addDoc(collection(db, 'items'), {
        ...newItem,
        picture: pictureUrl,
        createdBy: currentUser.uid,
        createdAt: new Date(),
      });
      Swal.fire({
        icon: 'success',
        title: 'Item Added',
        text: 'The item has been added successfully.',
      });
      setNewItem({ name: '', description: '', price: '', picture: '' });
      setImageFile(null);
      // Fetch updated items
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    } catch (error) {
      console.error('Error adding item: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the item. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id) => {
    if (authLoading || !userRole) {
      Swal.fire({
        icon: 'error',
        title: 'Not Authenticated',
        text: 'You are not authenticated yet. Please wait or reload the page.',
      });
      return; // Prevent updating if role is not ready
    }

    if (userRole !== 'admin' && userRole !== 'Vendor') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to update items.',
      });
      return;
    }

    setLoading(true);

    let pictureUrl = editItem.picture;

    if (imageFile) {
      const imageRef = ref(storage, `items/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      pictureUrl = await getDownloadURL(imageRef);
    }

    try {
      const itemRef = doc(db, 'items', id);
      await updateDoc(itemRef, {
        ...editItem,
        picture: pictureUrl,
      });
      Swal.fire({
        icon: 'success',
        title: 'Item Updated',
        text: 'The item has been updated successfully.',
      });
      // Fetch updated items
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
      setEditItem(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error updating item: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the item. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {(loading || authLoading) && <Loader />} {/* Show loader during data fetching or role loading */}
      {!authLoading && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Manage Items</h2>
          <form onSubmit={handleAddItem} className="mb-10 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
            >
              Add Item
            </button>
          </form>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Existing Items</h3>
            <ul>
              {items.map((item) => (
                <li key={item.id} className="mb-6 p-4 border border-gray-300 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex-1">
                      <h4 className="text-md font-semibold mb-1">Item ID: {item.id}</h4>
                      <p className="text-gray-600">Name: {item.name}</p>
                      <p className="text-gray-600">Description: {item.description}</p>
                      <p className="text-gray-600">Price: <FaCediSign/>{item.price}</p>
                    </div>
                    {item.picture && (
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="w-32 h-32 object-cover mt-4 sm:mt-0 sm:ml-4 rounded"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => setEditItem(item)}
                    className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  {editItem && editItem.id === item.id && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateItem(item.id);
                      }}
                      className="mt-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <input
                        type="text"
                        name="name"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                        placeholder="Name"
                        className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        name="description"
                        value={editItem.description}
                        onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                        placeholder="Description"
                        className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="number"
                        name="price"
                        value={editItem.price}
                        onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                        placeholder="Price"
                        className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="block w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                      >
                        Update Item
                      </button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageItems;
