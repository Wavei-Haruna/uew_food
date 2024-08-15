import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavItems } from '../Utils/NavItems';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import SignUp from '../admin/SignUp';
import Login from '../admin/Login';
import Logo from '../assets/Images/logo.png';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking if the user is authenticated and retrieving the role
    // You can replace this with actual logic to check authentication and fetch the user's role
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsAuthenticated(true);
      setRole(user.role);
    }
  }, []);

  const handleDashboardClick = () => {
    if (role === 'Vendor') {
      navigate('/vendor/dashboard');
    } else if (role === 'Rider') {
      navigate('/rider/dashboard');
    } else if (role === 'Admin') {
      navigate('/admin/dashboard');
    } else if (role === 'Customer') {
      navigate('/orders/create');
    }
  };

  return (
    <nav className="bg-primary p-2 z-50 font-menu text-s1 fixed w-full h-11 flex justify-around">
      <button
        className="md:hidden"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? (
          <HiX size={24} className="text-white" />
        ) : (
          <HiMenuAlt3 size={24} className="text-white" />
        )}
      </button>
      <div
        className={`${
          isNavOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:justify-between md:space-x-10 space-x-3 transform transition-all duration-300 ease-out`}
        style={{
          transform: isNavOpen ? 'translateX(1%) ' : 'translateX(2%)',
          width: '100%',
        }}
      >
        <ul
          className={`${isNavOpen ? 'left-0' : 'left-full'} absolute top-12 bottom-0 w-screen rounded-lg py-2 text px-4 bg-s2 bg-opacity-90 border border-primary md:static md:w-auto md:bg-transparent md:flex md:space-x-10 space-y-4 md:space-y-0 h-fit transition-all transform duration-200 ease-out`}
          style={{
            transform: isNavOpen ? 'translateX(0)' : 'translateX(2%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {NavItems.map((item) => (
            <li
              key={item.id}
              className="transition-all transform duration-200 cursor-pointer text-s1 font-menu hover:bg-primary py-1 ease-in"
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.to);
                  setIsNavOpen(false);

                  let page = document.getElementById(item.title);
                  const yOffset = -72;
                  const y = page?.getBoundingClientRect()?.top + window.scrollY + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-8">
        <img src={Logo} alt="Logo" className="h-8" />
        {isAuthenticated ? (
          <button
            className="z-10 md:static w-32 px-3 py-1 bg-white text-primary mr-8 border border-blue-500 h-fit font-semibold rounded-md text-center overflow-hidden hover:bg-blue-600"
            onClick={handleDashboardClick}
          >
            Dashboard
          </button>
        ) : (
          <>
            <button
              className="z-10 md:static w-32 px-3 py-1 bg-white text-primary mr-8 border border-blue-500 h-fit font-semibold rounded-md text-center overflow-hidden hover:bg-blue-600"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
            {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
            <button
              className="z-10 md:static px-3 py-1 font-semibold w-32 bg-blue-500 h-fit text-white rounded-md text-center overflow-hidden hover:bg-blue-600"
              onClick={() => setIsSignUpOpen(true)}
            >
              Register
            </button>
            {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}
          </>
        )}
      </div>
    </nav>
  );
}
