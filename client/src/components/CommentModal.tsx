import React, { useState } from 'react';
import axios from 'axios';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturerId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, lecturerId }) => {
  const [recipient, setRecipient] = useState('');
  const [comment, setComment] = useState('');

  const storedUserData = localStorage.getItem('role');
  var role = ""; 
  if (storedUserData) {
    role = JSON.parse(storedUserData);
    console.log(role);
  } else {
    console.error('User role not found in local storage');
  }

  const handleSubmit = async () => {
    try {
      await axios.put(`/lecture/remarks/${lecturerId}`, { from: role,to: recipient, text: comment });
      // Optionally, you can update local state or perform any other actions after adding the remark
      onClose();
      setRecipient('');
    setComment('');
    } catch (error) {
      console.error('Error adding remark:', error);
    }
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button className="text-gray-400 hover:text-gray-500" onClick={onClose}>
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Comment</h3>
              <div className="mt-2">
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">To Whom:</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="recipient"
                      id="recipient"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
                  <div className="mt-1">
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
