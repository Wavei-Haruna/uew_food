import React, { useState } from 'react';
import { NavItems } from '../Utils';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import SignUp from '../Modals/SignUp';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <nav className='bg-primary p-2 z-50 font-menu text-s1 fixed w-full h-11 flex justify-between'>
      <button
        className='md:hidden'
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? (
          <HiX size={24} className='text-white' />
        ) : (
          <HiMenuAlt3 size={24} className='text-white' />
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
          className={`${isNavOpen ? 'left-0' : 'left-full'} absolute top-12 bottom-0 w-full rounded-lg py-2 text px-4 bg-s2 bg-opacity-90 border border-primary md:static md:w-auto md:bg-transparent md:flex md:space-x-10 space-y-4 md:space-y-0 h-fit transition-all transform duration-200 ease-out`}
          style={{
            transform: isNavOpen ? 'translateX(0)' : 'translateX(2%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {NavItems.map((item) => (
            <li key={item.id} className='transition-all transform duration-200 cursor-pointer text-s1 font-menu hover:bg-primary py-1 ease-in '>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          className='z-10 md:static px-3 py-1 bg-blue-500 h-fit text-white rounded-md text-center overflow-hidden hover:bg-blue-600'
          onClick={() => setIsSignUpOpen(true)}
        >
          Register
        </button>
        {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}
      </div>
    </nav>
  );
}
