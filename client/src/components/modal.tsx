import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  isOpen?: boolean; // Make isOpen prop optional
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, isOpen = true, children }) => { // Assign a default value for isOpen
  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
