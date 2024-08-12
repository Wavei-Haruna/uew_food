import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';

const RiderProfileSettings = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bikeDetails: '',
    location: '',
    profilePicture: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const storage = getStorage();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setFormData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let userData = { ...formData };

      if (formData.profilePicture) {
        const profilePicRef = ref(storage, `profilePictures/${currentUser.uid}/${formData.profilePicture.name}`);
        await uploadBytes(profilePicRef, formData.profilePicture);
        const profilePicURL = await getDownloadURL(profilePicRef);
        userData.profilePictureURL = profilePicURL;
      }

      await updateDoc(doc(db, 'users', currentUser.uid), userData);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Rider Profile Settings</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="bikeDetails">Bike Details</label>
            <input
              type="text"
              id="bikeDetails"
              name="bikeDetails"
              value={formData.bikeDetails}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your bike details"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Update Profile'}
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded shadow mt-4 hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RiderProfileSettings;
