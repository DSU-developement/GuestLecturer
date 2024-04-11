import React from 'react';

interface Remark {
  from: string;
  text: string;
}

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
  accountDetails: {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    bankBranch: string;
  };
  panCardNumber: string;
  remarks: Remark[];
}

// defining Modal properties
interface DetailsModalProps {
  isOpen: boolean; 
  onClose: () => void; // closes Modal
  lecturer: Lecturer | null;
}


const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, lecturer }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="bg-white rounded-lg ">
                  <h3 className="text-center text-lg leading-6 font-medium text-gray-900 mb-4">Lecturer Details</h3>
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <div className="grid grid-cols-2 gap-4" >
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
                      </div>
                      <div>
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
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="yearAndSemester" className="block text-sm font-medium text-gray-700 mt-3">Year & Semester</label>
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
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{(lecturer?.startDate)?.substring(0, 10)}</p>
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
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mt-3">Account Number</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.accountDetails.accountNumber}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mt-3">Account Holder Name</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.accountDetails.accountHolderName}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mt-3">Bank Name</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.accountDetails.bankName}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="bankBranch" className="block text-sm font-medium text-gray-700 mt-3">Bank Branch</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.accountDetails.bankBranch}</p>
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="panCardNumber" className="block text-sm font-medium text-gray-700 mt-3">PAN Card Number</label>
                          <p className="bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{lecturer?.panCardNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mt-3 mb-2 text-center text-lg leading-6 font-medium text-gray-900">Remarks</h3>
                    {lecturer?.remarks.slice(1).map((remark, index) => (
                      <div key={index} className="grid grid-cols-3 w-80 mx-auto">
                        <label htmlFor={`remark${index}`} className="block text-sm font-medium text-gray-700 mt-3 text-right mr-6">{remark.from}</label>
                        <p id={`remark${index}`} className="col-span-2 bg-blue-50 mt-1 py-2 px-3 block w-full shadow-sm sm:text-sm border-gray-300">{remark.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
