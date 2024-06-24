import React from 'react';
import { BsFillPersonFill, BsPeopleFill, BsFillPersonCheckFill, BsPersonPlus } from 'react-icons/bs'; // Importing icons from React Icons

const SideBar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  return (
    <div className={`w-64 bg-blue-900 text-white fixed h-full overflow-y-auto transition-all duration-300 z-30 ${isOpen ? 'left-0' : '-left-full'}`}>
      <div className="p-6">
        <ul className="mt-6">
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'vendors' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => {
              setActiveTab('vendors');
              toggleSidebar(); // Close sidebar on click
            }}
          >
            <BsFillPersonCheckFill className="inline-block mr-2 text-xl" />
            Vendors
          </li>
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'riders' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => {
              setActiveTab('riders');
              toggleSidebar(); // Close sidebar on click
            }}
          >
            <BsFillPersonFill className="inline-block mr-2 text-xl" />
            Riders
          </li>
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'users' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => {
              setActiveTab('users');
              toggleSidebar(); // Close sidebar on click
            }}
          >
            <BsPeopleFill className="inline-block mr-2 text-xl" />
            Users
          </li>
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'createRider' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => {
              setActiveTab('createRider');
              toggleSidebar(); // Close sidebar on click
            }}
          >
            <BsPersonPlus className="inline-block mr-2 text-xl" />
            Create Rider
          </li>
          <li
            className={`p-3 rounded cursor-pointer ${activeTab === 'createVendor' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
            onClick={() => {
              setActiveTab('createVendor');
              toggleSidebar(); // Close sidebar on click
            }}
          >
            <BsPersonPlus className="inline-block mr-2 text-xl" />
            Create Vendor
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
