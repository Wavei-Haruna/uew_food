import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../firebase';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'Vendor', // Default to Vendor
    shopName: '', // Vendor-specific
    bikeDetails: '', // Rider-specific
    profilePicture: null, // Profile picture
    location: '', // New field for location
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // State to toggle between SignUp and Login
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();
  const storage = getStorage(); // Firebase Storage instance

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
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare the user data to store in Firestore
      let userData = {
        name,
        email,
        phone,
        role,
        location, // Add location to user data
        timeStamp: serverTimestamp(),
        ...(role === 'Vendor' && { shopName }), // Include shopName only if the role is Vendor
        ...(role === 'Rider' && { bikeDetails }), // Include bikeDetails only if the role is Rider
      };

      // Handle profile picture upload if provided
      if (profilePicture) {
        const profilePicRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
        await uploadBytes(profilePicRef, profilePicture);
        const profilePicURL = await getDownloadURL(profilePicRef);
        userData.profilePictureURL = profilePicURL; // Add profile picture URL to userData
      }

      // Store the user data in Firestore using the user's UID as the document ID
      await setDoc(doc(db, 'users', user.uid), userData);

      toast.success("Account created Kindly login");

      // Redirect based on role
      // if (role === 'Vendor') {
      //   navigate('/vendor/dashboard');
      // } else if (role === 'Rider') {
      //   navigate('/rider/dashboard');
      // } else if (role === 'Admin') {
      //   navigate('/admin/dashboard');
      // } else if (role === 'Customer') {
      //   navigate('/orders/create');
      // }
        navigate('/')
      setLoading(false);
      onClose(); // Close the modal after successful sign-up

    } catch (error) {
      setError(error.message);
      toast.error("Oops, there was an error");
      setLoading(false);
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
                  <option value="Admin">Admin</option>
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
className="w-full p-3 text-s2 border rounded shadow-sm focus
focus
"
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
<p className="mt-4 text-center text-primary">
Already have an account?{' '}
<button
onClick={() => setIsLogin(true)}
className="text-blue-500 hover
"
>
Login
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