import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const SignupPageLect = () => {
  const [formData, setFormData] = useState({
    facultyName: '',
    phone: '',
    email: '',
    qualifications: {
      ug: false,
      pg: false,
      phd: false
    },
    schoolsDeanery: '',
    department: '',
    subjectName: '',
    yearAndSemester: '',
    sectionsHandled: '',
    hours: '',
    startDate: '',
    proposedRate: '',
    totalAmount: '',
    documents: '',
    accountDetails: {
      accountNumber: '',
      accountHolderName: '',
      bankName: '',
      bankBranch: ''
    },
    panCardNumber: '',
    remarks: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        qualifications: {
          ...formData.qualifications,
          [name.split('.')[1]]: isChecked
        }
      });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as Record<string, any>),
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      await axios.post('/api/signup', formData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred while signing up');
        }
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label>Faculty Name:</label>
          <input type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Qualifications:</label>
          <div>
            <label><input type="checkbox" name="qualifications.ug" checked={formData.qualifications.ug} onChange={handleChange} /> UG</label>
          </div>
          <div>
            <label><input type="checkbox" name="qualifications.pg" checked={formData.qualifications.pg} onChange={handleChange} /> PG</label>
          </div>
          <div>
            <label><input type="checkbox" name="qualifications.phd" checked={formData.qualifications.phd} onChange={handleChange} /> PhD</label>
          </div>
        </div>
        <div>
          <label>Schools/Deanery:</label>
          <input type="text" name="schoolsDeanery" value={formData.schoolsDeanery} onChange={handleChange} />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Subject Name:</label>
          <input type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required />
        </div>
        <div>
          <label>Year & Semester:</label>
          <input type="text" name="yearAndSemester" value={formData.yearAndSemester} onChange={handleChange} required />
        </div>
        <div>
          <label>No. of Sections to be handled:</label>
          <input type="number" name="sectionsHandled" value={formData.sectionsHandled} onChange={handleChange} required />
        </div>
        <div>
          <label>No. of Hours:</label>
          <input type="number" name="hours" value={formData.hours} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Proposed Rate (Per Hour):</label>
          <input type="number" name="proposedRate" value={formData.proposedRate} onChange={handleChange} required />
        </div>
        <div>
          <label>Total Amount:</label>
          <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
        </div>


        <div>
          <label>Account Number:</label>
          <input type="text" name="accountDetails.accountNumber" value={formData.accountDetails.accountNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Account Holder Name:</label>
          <input type="text" name="accountDetails.accountHolderName" value={formData.accountDetails.accountHolderName} onChange={handleChange} required />
        </div>
        <div>
          <label>Bank Name:</label>
          <input type="text" name="accountDetails.bankName" value={formData.accountDetails.bankName} onChange={handleChange} required />
        </div>
        <div>
          <label>Bank Branch:</label>
          <input type="text" name="accountDetails.bankBranch" value={formData.accountDetails.bankBranch} onChange={handleChange} required />
        </div>
        <div>
          <label>PAN Card Number:</label>
          <input type="text" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Remarks:</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SignupPageLect;