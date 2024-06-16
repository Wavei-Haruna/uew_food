import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center top-16 z-50">
      <div className="bg-white h-full p-6 rounded shadow-lg relative w-full max-w-md overflow-hidden">
        <button
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="modal-content overflow-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
