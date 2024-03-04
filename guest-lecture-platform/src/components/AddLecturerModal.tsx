import React, { useState } from 'react';
import Modal from '../components/modal';
import { Lecturer } from './dummy';

interface AddLecturerModalProps {
    isOpen: boolean;
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
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="lecturerName">Name:</label>
                        <input type="text" id="lecturerName" name="lecturerName" value={formData.lecturerName} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerPhoneNumber">Phone Number:</label>
                        <input type="text" id="lecturerPhoneNumber" name="lecturerPhoneNumber" value={formData.lecturerPhoneNumber} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerEmail">Email:</label>
                        <input type="email" id="lecturerEmail" name="lecturerEmail" value={formData.lecturerEmail} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerQualifications">Qualifications:</label>
                        <input type="text" id="lecturerQualifications" name="lecturerQualifications" value={formData.lecturerQualifications} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerSchools">Schools:</label>
                        <input type="text" id="lecturerSchools" name="lecturerSchools" value={formData.lecturerSchools} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerDept">Department:</label>
                        <input type="text" id="lecturerDept" name="lecturerDept" value={formData.lecturerDept} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerSubject">Subject:</label>
                        <input type="text" id="lecturerSubject" name="lecturerSubject" value={formData.lecturerSubject} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerSem_year">Semester/Year:</label>
                        <input type="text" id="lecturerSem_year" name="lecturerSem_year" value={formData.lecturerSem_year} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerClasses">Classes:</label>
                        <input type="text" id="lecturerClasses" name="lecturerClasses" value={formData.lecturerClasses} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerHours">Hours:</label>
                        <input type="text" id="lecturerHours" name="lecturerHours" value={formData.lecturerHours} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerRate">Rate:</label>
                        <input type="text" id="lecturerRate" name="lecturerRate" value={formData.lecturerRate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerAmount">Amount:</label>
                        <input type="text" id="lecturerAmount" name="lecturerAmount" value={formData.lecturerAmount} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="lecturerRemarks">Remarks:</label>
                        <textarea id="lecturerRemarks" name="lecturerRemarks" value={formData.lecturerRemarks} onChange={handleChange} required />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
            </form>
        </Modal>
    );
};
  
export default AddLecturerModal;
