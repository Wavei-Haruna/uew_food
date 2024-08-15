import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase'; // Ensure db is imported
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  useEffect(() => {
    if (currentUser) {
      // Redirect based on user role when currentUser changes
      const redirectUser = async () => {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role || 'user';

          if (role === 'admin') {
            navigate('/admin/dashboard');
          } else if (role === 'Vendor') {
            navigate('/vendor/dashboard');
          } else if (role === 'Rider') {
            navigate('/rider/dashboard');
          } else {
            navigate('/'); // Default redirect if no matching role
          }
        } else {
          console.error('No such document!');
          navigate('/'); // Default redirect if user document is not found
        }
      };

      redirectUser();
    }
  }, [currentUser, navigate]);

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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in");

      // Set up an auth state observer to handle user role-based redirection
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user); // Update context with current user
        }
        setLoading(false);
        onClose(); // Close the modal after successful login
      });
    } catch (error) {
      setError(error.message);
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setCurrentUser(user);
      toast.success("Successfully signed in with Google");

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role || 'user';

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'Vendor') {
          navigate('/vendor/dashboard');
        } else if (role === 'Rider') {
          navigate('/rider/dashboard');
        } else {
          navigate('/'); // Default redirect if no matching role
        }
      } else {
        console.error('No such document!');
        navigate('/'); // Default redirect if user document is not found
      }

      setLoading(false);
      onClose(); // Close the modal after successful login
    } catch (error) {
      setError(error.message);
      toast.error("Failed to sign in with Google");
      setLoading(false);
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
            disabled={loading || authLoading} // Disable button if loading
          >
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Login'}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 text-white p-3 rounded shadow hover:bg-red-600 transition duration-300"
            disabled={loading || authLoading}
          >
            <FaGoogle className="mr-2" />
            Sign In with Google
          </button>
        </div>
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
