import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import CreateRider from './CreateRider';
import CreateVendor from './CreateVendor';
import { BsPeopleFill, BsFillPersonFill, BsFillPersonCheckFill,  BsX, BsMenuDown } from 'react-icons/bs'; // Importing icons from React Icons
import { db, auth } from '../firebase'; // Assuming 'auth' is imported from Firebase
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('vendors');
  const [users, setUsers] = useState([]);
  const [riders, setRiders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar open/close
const navigate= useNavigate();
  useEffect(() => {
    fetchUsers();
    fetchRiders();
    fetchVendors();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const fetchRiders = async () => {
    try {
      const ridersSnapshot = await getDocs(collection(db, 'riders'));
      const ridersData = ridersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRiders(ridersData);
    } catch (error) {
      console.error('Error fetching riders:', error);
      toast.error('Failed to fetch riders');
    }
  };

  const fetchVendors = async () => {
    try {
      const vendorsSnapshot = await getDocs(collection(db, 'vendors'));
      const vendorsData = vendorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVendors(vendorsData);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to fetch vendors');
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'users', userId));
      toast.success('User deleted successfully');
      await fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRider = async (riderId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'riders', riderId));
      toast.success('Rider deleted successfully');
      await fetchRiders(); // Refresh riders list
    } catch (error) {
      console.error('Error deleting rider:', error);
      toast.error('Failed to delete rider');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVendor = async (vendorId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'vendors', vendorId));
      toast.success('Vendor deleted successfully');
      await fetchVendors(); // Refresh vendors list
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast.error('Failed to delete vendor');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase sign out
      navigate("/");
     toast.success("Logged out")

    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const renderUsers = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-2">
              <div className="flex items-center">
                <BsPeopleFill className="text-2xl mr-2 text-primary" />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteUser(user.id)}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderRiders = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Riders</h2>
        <ul>
          {riders.map(rider => (
            <li key={rider.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-2">
              <div className="flex items-center">
                <BsFillPersonFill className="text-2xl mr-2 text-primary" />
                <div>
                  <p className="font-semibold">{rider.name}</p>
                  <p className="text-gray-600">{rider.email}</p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteRider(rider.id)}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderVendors = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Vendors</h2>
        <ul>
          {vendors.map(vendor => (
            <li key={vendor.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-2">
              <div className="flex items-center">
                <BsFillPersonCheckFill className="text-2xl mr-2 text-primary" />
                <div>
                  <p className="font-semibold">{vendor.name}</p>
                  <p className="text-gray-600">{vendor.email}</p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteVendor(vendor.id)}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-menu">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Menu Button */}
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <BsX className="text-2xl" /> : <BsMenuDown className="text-2xl" />}
          </button>

          {/* Welcome Message */}
          <div>
            <h1 className="text-2xl font-semibold">Welcome to Admin Dashboard</h1>
          </div>

          {/* Logout Button */}
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className={`flex-1 p-6 ${isSidebarOpen ? 'ml-64' : ''}`}>
          {/* Main Content Area */}
          <div className="md:flex justify-between mb-6 space-y-10 md:space-x-10 md:space-y-0">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-full">
              <BsPeopleFill className="text-4xl text-primary mr-4" />
              <div>
                <p className="text-lg font-semibold text-blue-500">Total Users</p>
                <p className="text-gray-600">{users.length}</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-full">
              <BsFillPersonFill className="text-4xl text-primary mr-4" />
              <div>
                <p className="text-lg font-semibold text-blue-500">Total Riders</p>
                <p className="text-gray-600">{riders.length}</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md w-full">
              <BsFillPersonCheckFill className="text-4xl text-primary mr-4" />
              <div>
                <p className="text-lg font-semibold text-blue-500">Total Vendors</p>
                <p className="text-gray-600">{vendors.length}</p>
              </div>
            </div>
          </div>

          {/* Conditional Rendering based on activeTab */}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'riders' && renderRiders()}
          {activeTab === 'vendors' && renderVendors()}
          {activeTab === 'createRider' && <CreateRider />}
          {activeTab === 'createVendor' && <CreateVendor />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
