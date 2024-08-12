import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const CreateVendor = ({ setView }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'vendors'), {
        name,
        location,
      });
      setName('');
      setLocation('');
      setView('list');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="p-2 bg-green-600 text-white rounded">
          Add Vendor
        </button>
      </form>
    </div>
  );
};

export default CreateVendor;
