import React, { useState } from 'react';
import Modal from '../components/modal';
import { Lecturer } from './dummy';

interface AddLecturerModalProps {
    isOpen: boolean; // Add isOpen prop
    onClose: () => void;
    onAddLecturer: (lecturer: Lecturer) => void;
  }
  
  const AddLecturerModal: React.FC<AddLecturerModalProps> = ({ isOpen, onClose, onAddLecturer }) => {
    const [formData, setFormData] = useState<Lecturer>({
      key: 0,
      lecturerName: '',
      lecturerPhoneNumber: '',
      lecturerEmail: '',
      lecturerQualifications: '',
      lecturerSchools: '',
      lecturerDept: '',
      lecturerSubject: '',
      lecturerSem_year: '',
      lecturerClasses: '',
      lecturerHours: '',
      lecturerRate: '',
      lecturerAmount: '',
      lecturerRemarks: '',
      status: '',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onAddLecturer(formData);
      onClose(); // Close the modal after submitting the form
    };
  
    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="lecturerName">Name:</label>
          <input type="text" id="lecturerName" name="lecturerName" value={formData.lecturerName} onChange={handleChange} required />
          {/* Add more input fields for other details */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
        </form>
      </Modal>
    );
  };
  
  export default AddLecturerModal;