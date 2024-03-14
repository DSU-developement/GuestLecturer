import React, { useState, useEffect } from 'react';
import Modal from './modal';
import { Lecturer } from './type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lecturer: Lecturer) => void;
  lecturer: Lecturer | null;
}

const EditModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, lecturer }) => {
  const [formData, setFormData] = useState<Lecturer | null>(null);

  // Set formData to lecturer when lecturer prop changes
  useEffect(() => {
    setFormData(lecturer);
  }, [lecturer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSubmit(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      {formData && (
        <div className='flex'>
          <div className="w-1/2 px-4">
            {/* First Column */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input type="text" name="lecturerName" value={formData.lecturerName} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
              <input type="text" name="lecturerPhoneNumber" value={formData.lecturerPhoneNumber} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input type="text" name="lecturerEmail" value={formData.lecturerEmail} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Qualifications:</label>
              <input type="text" name="lecturerQualifications" value={formData.lecturerQualifications} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Schools:</label>
              <input type="text" name="lecturerSchools" value={formData.lecturerSchools} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
              <input type="text" name="lecturerDept" value={formData.lecturerDept} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
              <input type="text" name="status" value={formData.status} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
          </div>
          <div className="w-1/2 px-4">
            {/* Second Column */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
              <input type="text" name="lecturerSubject" value={formData.lecturerSubject} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Semester/Year:</label>
              <input type="text" name="lecturerSem_year" value={formData.lecturerSem_year} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Classes:</label>
              <input type="text" name="lecturerClasses" value={formData.lecturerClasses} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Hours:</label>
              <input type="text" name="lecturerHours" value={formData.lecturerHours} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
              <input type="date" name="lecturerStartDate" value={formData.lecturerStartDate} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Rate:</label>
              <input type="text" name="lecturerRate" value={formData.lecturerRate} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
              <input type="text" name="lecturerAmount" value={formData.lecturerAmount} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label>Account Details</label>
              <label className="block text-gray-700 text-sm font-bold mb-2">A/C Number:</label>
              <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <label className="block text-gray-700 text-sm font-bold mb-2">A/C Holder Name:</label>
              <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <label className="block text-gray-700 text-sm font-bold mb-2">Bank Name:</label>
              <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="border rounded-md p-2 w-full" />
              <label className="block text-gray-700 text-sm font-bold mb-2">Bank Branch:</label>
              <input type="text" name="bankBranch" value={formData.bankBranch} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">PAN Card number:</label>
              <input type="text" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Remarks:</label>
              <input type="text" name="lecturerRemarks" value={formData.lecturerRemarks} onChange={handleChange} className="border rounded-md p-2 w-full" />
            </div>
            
          </div>
        </div>
      )}
      <div className="flex justify-end">
        {/* Save Changes Button */}
        <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
