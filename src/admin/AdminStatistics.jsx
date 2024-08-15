import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import Loader from '../Components/Loader';
import Swal from 'sweetalert2';
import 'chart.js/auto';

const AdminStatistics = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, 'users'));
        const orderSnapshot = await getDocs(collection(db, 'orders'));

        const usersData = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const ordersData = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const orderStatuses = orders.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    return acc;
  }, {});

  const userChartData = {
    labels: Object.keys(groupedUsers),
    datasets: [
      {
        label: 'Users by Role',
        data: Object.values(groupedUsers).map(group => group.length),
        backgroundColor: ['#4bc0c0', '#ff9f40', '#ff6384'],
      },
    ],
  };

  const orderChartData = {
    labels: Object.keys(orderStatuses),
    datasets: [
      {
        label: 'Orders',
        data: Object.values(orderStatuses),
        backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0', '#ff9f40'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Admin Dashboard - Statistics Overview</h2>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* Responsive Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">User Distribution</h3>
              <Bar data={userChartData} />
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-center">Order Status Overview</h3>
              <Bar data={orderChartData} />
            </div>
          </div>

          {/* User Table */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Manage Users</h3>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminStatistics;
