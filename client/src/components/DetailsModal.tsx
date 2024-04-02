import React from 'react';

interface Lecturer {
  facultyName: string;
  phone: string;
  email: string;
  schoolsDeanery: string;
  department: string;
  subjectName: string;
  yearAndSemester: string;
  sectionsHandled: number;
  hours: number;
  startDate: string;
  proposedRate: number;
  totalAmount: number;
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
                    <div className="grid grid-cols-2 gap-4" >
                      {/* Display lecturer details */}
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 mt-3">Name</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.facultyName}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mt-3">Phone</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.phone}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">Email</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.email}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="schoolsDeanery" className="block text-sm font-medium text-gray-700 mt-3">School's Deanery</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.schoolsDeanery}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mt-3">Department</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.department}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mt-3">Subject Name</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.subjectName}</p>
                        </div>
                      </div>
                      {/* Display remaining lecturer details in the next two columns */}
                      <div >
                        <div className="col-span-6">
                          <label htmlFor="yearAndSemester" className="block text-sm font-medium text-gray-700 mt-3">Year And Semester</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.yearAndSemester}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="sectionsHandled" className="block text-sm font-medium text-gray-700 mt-3">Sections Handled</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.sectionsHandled}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mt-3">hours</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.hours}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mt-3">StartDate</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.startDate}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="proposedRate" className="block text-sm font-medium text-gray-700 mt-3">Proposed Rate</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.proposedRate}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mt-3">Total Amount</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.totalAmount}</p>
                        </div>
                      </div>
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
