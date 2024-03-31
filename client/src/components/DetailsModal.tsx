import React from 'react';

interface Lecturer {
  facultyName: string;
  phone: string;
  email: string;
  // Add other lecturer details as needed
}

interface DetailsModalProps {
  isOpen: boolean; // Indicates if the modal is open or closed
  onClose: () => void; // Function to close the modal
  lecturer: Lecturer | null; // Data of the lecturer to be displayed
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, lecturer }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          {/* Modal content */}
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* Modal body */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Modal header */}
                <div className="bg-white rounded-lg ">
                  {/* Modal title */}
                  <h3 className="text-center text-lg leading-6 font-medium text-gray-900 mb-4">Lecturer Details</h3>
                  {/* Modal content */}
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Display lecturer details */}
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 mt-3">Name</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.facultyName}</p>
                        </div>
                        {/* Add other details */}
                      </div>
                      {/* Add more columns for other details */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* Close button */}
                <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsModal;
