import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const CreateVendor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { email, password, ...vendorData } = formData;

      // Create user in Firebase Auth without logging in
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set custom claims for the vendor role
      await setDoc(doc(db, 'users', user.uid), {
        ...vendorData,
        email,
        role: 'vendor',
        createdAt: serverTimestamp(),
      });

      // Add vendor to Firestore
      await addDoc(collection(db, 'vendors'), {
        ...vendorData,
        email,
        createdAt: serverTimestamp(),
      });

      toast.success('Vendor Created Successfully');
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        location: '',
        password: '',
      });
    } catch (error) {
      setError(error.message);
      toast.error('Error creating vendor: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center font-primary text-primary">Create Vendor</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className='font-menu'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter vendor name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter vendor email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter vendor phone"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter vendor address"
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
              placeholder="Enter vendor location"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter vendor password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Vendor'}
        </button>
      </form>
    </div>
  );
};

export default CreateVendor;
