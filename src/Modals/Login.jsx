import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure db is imported from your Firebase config
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.role === 'admin') {
          toast.success("Welcome Haruna");
          navigate('/admin-dashboard'); // Navigate to admin dashboard if user is an admin
        } else {
          navigate('/dashboard'); // Navigate to user dashboard if user is not an admin
        }
        toast.success("Successfully logged in");
      } else {
        toast.error("User data not found");
      }

      setLoading(false);
      onClose(); // Close the modal after successful login
    } catch (error) {
      setError(error.message);
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Modal isVisible={true} onClose={onClose}>
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </p>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Login;
