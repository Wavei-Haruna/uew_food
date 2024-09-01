import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../firebase';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'; // Add Google icon

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'Vendor', 
    shopName: '', 
    bikeDetails: '', 
    profilePicture: null, 
    location: '', 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();
  const storage = getStorage(); 

  const { name, email, password, phone, role, shopName, bikeDetails, profilePicture, location } = formData;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let userData = {
        name,
        email,
        phone,
        role,
        location, 
        timeStamp: serverTimestamp(),
        ...(role === 'Vendor' && { shopName }), 
        ...(role === 'Rider' && { bikeDetails }), 
      };

      if (profilePicture) {
        const profilePicRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
        await uploadBytes(profilePicRef, profilePicture);
        const profilePicURL = await getDownloadURL(profilePicRef);
        userData.profilePictureURL = profilePicURL; 
      }

      await setDoc(doc(db, 'users', user.uid), userData);

      toast.success("Account created! Kindly login");

      if (role === 'Vendor') {
        navigate('/vendor/dashboard');
      } else if (role === 'Rider') {
        navigate('/rider/dashboard');
      } else if (role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (role === 'Customer') {
        navigate('/customer');
      }
      
      setLoading(false);
      onClose(); 
    } catch (error) {
      setError(error.message);
      toast.error("Oops, there was an error");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore, if not, create a new document
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          profilePictureURL: user.photoURL,
          role: 'Customer',
          location: '', 
          timeStamp: serverTimestamp(),
        });
      }

      toast.success("Logged in with Google!");
      navigate('/order/create'); 
      onClose(); 
    } catch (error) {
      setError(error.message);
      toast.error("Google sign-in failed");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Error sending reset email");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Modal isVisible={true} onClose={onClose} >
        {isLogin ? (
          <Login onClose={onClose} />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create an Account</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
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
              <div className="mb-4">
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleInputChange}
                  className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter your location"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={handleInputChange}
                  className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="Vendor">Vendor</option>
                  <option value="Rider">Rider</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
              {role === 'Vendor' && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="shopName">Shop Name</label>
                  <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    value={shopName}
                    onChange={handleInputChange}
                    className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter your shop name"
                    required
                  />
                </div>
              )}
                            {role === 'Rider' && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="bikeDetails">Bike Details</label>
                  <input
                    type="text"
                    id="bikeDetails"
                    name="bikeDetails"
                    value={bikeDetails}
                    onChange={handleInputChange}
                    className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter your bike details"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full p-3 text-s2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
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
            <div className="mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center bg-red-500 text-white p-3 rounded shadow hover:bg-red-600 transition duration-300"
              >
                <FaGoogle className="mr-2" />
                Sign Up with Google
              </button>
            </div>
            <p className="mt-4 text-center text-primary">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
            <p className="mt-2 text-center text-primary">
              Forgot your password?{' '}
              <button
                onClick={handleResetPassword}
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </button>
            </p>
          </>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
