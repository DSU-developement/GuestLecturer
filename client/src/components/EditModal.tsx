import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
  proposedRate: string;
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


// defining Modal properties
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void; // closes Modal
  lecturer: Lecturer;
  onSubmit: (editedLecturer: Lecturer) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, lecturer, onSubmit }) => {
  const [editedLecturer, setEditedLecturer] = useState<Lecturer>(lecturer);

  // useEffect to update the editedLecturer state whenever the lecturer prop changes
  useEffect(() => {
    setEditedLecturer(lecturer);
  }, [lecturer]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "accountNumber" || name === "accountHolderName" || name === "bankName" || name === "bankBranch") {
      let parent = "accountDetails";
      let child = name;

      setEditedLecturer(prevState => ({
        ...prevState,
        [parent]: {
          ...(prevState[parent as keyof typeof editedLecturer] as Record<string, any>),
          [child]: value
        }
      }));
    } else if (name === 'hours') {
      const hours = parseInt((value === '' ? 0 : value).toString());
      const proposedRate = parseFloat(editedLecturer.proposedRate) || 0;
      const totalAmount = proposedRate * hours;
  
      setEditedLecturer(prevState => ({
        ...prevState,
        hours: hours,
        totalAmount: totalAmount
      }));
    } else if (name === "proposedRate") {
      const inpField = document.getElementById("proposedRate");
      var rate = parseInt((value === '' ? 0 : value).toString());
      const totalAmount = rate * editedLecturer.hours;

      if(inpField) {
        if(editedLecturer.qualifications.ug && rate > 800) {
          inpField.style.border = "1px solid red";
          inpField.style.borderRadius = "5px";
          inpField.style.outline = "red";
          setEditedLecturer(prevState => ({ ...prevState, [name]: '' }));
          return;
        } else if(editedLecturer.qualifications.pg && rate > 1000) {
          inpField.style.border = "1px solid red";
          inpField.style.outline = "red";
          setEditedLecturer(prevState => ({ ...prevState, [name]: '' }));
          return;
        } else if(editedLecturer.qualifications.phd && rate > 1200) {
          inpField.style.border = "1px solid red";
          inpField.style.outline = "red";
          setEditedLecturer(prevState => ({ ...prevState, [name]: '' }));
          return;
        } else {
          inpField.style.border = "";
          setEditedLecturer(prevState => ({
            ...prevState,
            [name]: rate.toString(),
            totalAmount: totalAmount
          }));
        }
      }
    } else {
      setEditedLecturer(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const handleSubmit = async  () => {
    try {
      if (editedLecturer.proposedRate === '') {
        editedLecturer.proposedRate = (editedLecturer.qualifications.ug ? 800 : editedLecturer.qualifications.pg ? 1000 : 1200).toString();
      }

      const response = await axios.put(`https://guest-lecturer.vercel.app/api/edit/lecture`, editedLecturer);
      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating lecturer:', error);
    }
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="bg-white rounded-lg ">
                  <h3 className="text-center text-lg leading-6 font-medium text-gray-900 mb-4">Edit Lecturer Details</h3>
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 mt-3">Name</label>
                          <input type="text" name="facultyName" id="facultyName" value={editedLecturer.facultyName} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 " />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mt-3">Phone</label>
                          <input type="text" name="phone" id="phone" value={editedLecturer.phone} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">Email</label>
                          <input type="email" name="email" id="email" value={editedLecturer.email} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mt-3">Qualification</label>
                          <input type="text" name="qualification" id="qualification" value={editedLecturer.qualifications.ug ? "Under Graduate" : editedLecturer.qualifications.pg ? "Post Graduate" : "Phd"} className="cursor-not-allowed p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                        </div>
                      </div>
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="schoolsDeanery" className="block text-sm font-medium text-gray-700 mt-3">School's Deanery</label>
                          <input type="text" name="schoolsDeanery" id="schoolsDeanery" value={editedLecturer.schoolsDeanery} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mt-3">Department</label>
                          <input type="text" name="department" id="department" value={editedLecturer.department} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mt-3">Subject Name</label>
                          <input type="text" name="subjectName" id="subjectName" value={editedLecturer.subjectName} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300d" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="yearAndSemester" className="block text-sm font-medium text-gray-700 mt-3">Year And Semester</label>
                          <input type="text" name="yearAndSemester" id="yearAndSemester" value={editedLecturer.yearAndSemester} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300" />
                        </div>
                      </div>
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="sectionsHandled" className="block text-sm font-medium text-gray-700 mt-3">Section's Handled</label>
                          <input type="number" name="sectionsHandled" id="sectionsHandled" value={editedLecturer.sectionsHandled} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 " />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mt-3">Hours</label>
                          <input type="number" name="hours" id="hours" value={editedLecturer.hours} onChange={handleChange} className="p-2 bg-blue-50 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 " />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mt-3">Start Date</label>
                          <input type="date" name="startDate" id="startDate" value={(editedLecturer.startDate).substring(0, 10)} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="proposedRate" className="block text-sm font-medium text-gray-700 mt-3">Proposed Rate</label>
                          <input type="text" name="proposedRate" id="proposedRate" placeholder={editedLecturer.qualifications.ug ? "upto 800 only" : editedLecturer.qualifications.pg ? "800 - 1000 only" : "1000 - 1200 only"} value={editedLecturer.proposedRate} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mt-3">Total Amount</label>
                          <input type="number" name="totalAmount" id="totalAmount" value={editedLecturer.totalAmount} className="cursor-not-allowed p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                      </div>
                      <div>
                        <div className="col-span-6">
                          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mt-3">Account Number</label>
                          <input type="text" name="accountNumber" id="accountNumber" value={editedLecturer.accountDetails.accountNumber} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mt-3">Account Holder Name</label>
                          <input type="text" name="accountHolderName" id="accountHolderName" value={editedLecturer.accountDetails.accountHolderName} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mt-3">Bank Name</label>
                          <input type="text" name="bankName" id="bankName" value={editedLecturer.accountDetails.bankName} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="bankBranch" className="block text-sm font-medium text-gray-700 mt-3">Bank Branch</label>
                          <input type="text" name="bankBranch" id="bankBranch" value={editedLecturer.accountDetails.bankBranch} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
                        <div className="col-span-6">
                          <label htmlFor="panCardNumber" className="block text-sm font-medium text-gray-700 mt-3">PAN Card Number</label>
                          <input type="text" name="panCardNumber" id="panCardNumber" value={editedLecturer.panCardNumber} onChange={handleChange} className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-blue-50" />
                        </div>
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
