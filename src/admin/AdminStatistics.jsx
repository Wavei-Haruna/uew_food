import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { FaUsers, FaStore, FaMotorcycle } from 'react-icons/fa';
import Loader from '../Components/Loader';
import Swal from 'sweetalert2';

const AdminStatistics = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const groupedUsers = users.reduce((acc, user) => {
    acc[user.role] = [...(acc[user.role] || []), user];
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Dashboard - User Statistics</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow-md">
              <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center">
                <FaUsers className="mr-2" /> Customers
              </h3>
              {groupedUsers.Customer?.length ? (
                <ul>
                  {groupedUsers.Customer.map(user => (
                    <li key={user.id} className="mb-2 flex justify-between items-center">
                      <span>{user.name} ({user.email})</span>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No customers found.</p>
              )}
            </div>

            <div className="p-4 bg-white rounded shadow-md">
              <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center">
                <FaStore className="mr-2" /> Vendors
              </h3>
              {groupedUsers.Vendor?.length ? (
                <ul>
                  {groupedUsers.Vendor.map(user => (
                    <li key={user.id} className="mb-2 flex justify-between items-center">
                      <span>{user.name} ({user.email})</span>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No vendors found.</p>
              )}
            </div>

            <div className="p-4 bg-white rounded shadow-md">
              <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center">
                <FaMotorcycle className="mr-2" /> Riders
              </h3>
              {groupedUsers.Rider?.length ? (
                <ul>
                  {groupedUsers.Rider.map(user => (
                    <li key={user.id} className="mb-2 flex justify-between items-center">
                      <span>{user.name} ({user.email})</span>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No riders found.</p>
              )}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminStatistics;
