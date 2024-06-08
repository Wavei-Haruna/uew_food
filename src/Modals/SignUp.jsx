import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, FieldValue, serverTimestamp } from 'firebase/firestore';
import { db , auth} from '../firebase';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = ({ onClose }) => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const { email, password, phone } = formData;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add additional user info to Firestore with server timestamp

      const formDataCopy = {...formData}
       delete formDataCopy.password;
       formDataCopy.timeStamp = serverTimestamp();
    
      await addDoc(collection(db, 'users'), formDataCopy);
      

      toast.success("account created")
      setLoading(false);
      onClose(); // Close the modal after successful sign-up
    } catch (error) {
      setError(error.message);
      toast.error("opps there is an error")
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
 
      <Modal isVisible={true} onClose={onClose}>
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create an Account</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Sign Up'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
