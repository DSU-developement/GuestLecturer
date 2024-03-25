import React, { useState } from 'react';

interface Lecturer {
  facultyName: string;
  phone: string;
  email: string;
  password: string;
  qualifications: {
    ug: boolean;
    pg: boolean;
    phd: boolean;
  };
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
  dept_id: number;
  dean_id: number;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturer: Lecturer;
  onSubmit: (editedLecturer: Lecturer) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, lecturer, onSubmit }) => {
  const [editedLecturer, setEditedLecturer] = useState<Lecturer>(lecturer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLecturer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(editedLecturer);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Lecturer Details</h3>
                    <div className="mt-2">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700">Name</label>
                          <input type="text" name="facultyName" id="facultyName" value={editedLecturer.facultyName} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                          <input type="text" name="phone" id="phone" value={editedLecturer.phone} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <input type="email" name="email" id="email" value={editedLecturer.email} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        {/* Add other input fields for lecturer details */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
