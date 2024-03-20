import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

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
    <div className='h-full flex flex-col bg-gray-100'>
      <div className="md:max-w-4xl w-full container mx-auto p-6 rounded-xl m-6 bg-white" style={{ backgroundImage: `url("./bg.jpeg")` }}>
        <div className='flex justify-center mb-4'>
          <CgProfile className='text-6xl text-blue-600' />
        </div>
        <h2 className="text-4xl mb-4 text-center font-bold">Create a new Guest Lecturer account </h2>
        <form onSubmit={handleSignup} className="space-y-4 p-3">
          <div className='grid grid-cols-2 gap-6'>
            <div className='bg-gray-100 rounded border-l-8  p-3 flex flex-col justify-items-start flex-wrap items-center'>
              <h2 className='font-mono font-black text-2xl w-full font-bold text-blue-500 col-span-2 text-center mb-3'>PERSONAL DETAILS</h2>
              <div className='m-2 p-2'>
                {/* <label>Name:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Name" type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Phone:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Phone" type="text" name='phone' value={formData.phone} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Email:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Email"  type="text" name='email' value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className='bg-gray-100 rounded border-l-8  p-3 flex flex-col justify-items-start flex-wrap items-center'>
              <h2 className='font-mono font-black text-2xl w-full border-sky-200 font-bold text-blue-500 col-span-2 text-center mb-3'>ACADEMIC DETAILS</h2>
              <div className='p-2 flex flex-col'>
                {/* <label className='text-center text-gray-500 text-l'>Qualifications</label> */}
                <div className='flex'>
                  <div className='m-3'>
                    <label className='font-mono font-bold text-xl text-blue-600 m-1'> UG</label>
                    <input className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="qualifications.ug" checked={formData.qualifications.ug} onChange={handleChange} />
                  </div>
                  <div className='m-3'>
                    <label className='font-mono font-bold text-xl text-blue-600 m-1'> PG</label>
                    <input className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="qualifications.pg" checked={formData.qualifications.pg} onChange={handleChange} />
                  </div>
                  <div className='m-3'>
                    <label className='font-mono font-bold  text-xl text-blue-600 m-1'> PhD</label>
                    <input className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="qualifications.phd" checked={formData.qualifications.phd} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className='m-2 p-2'>
                {/* <label>Schools/Deanery:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Schools/Deanery" type="text" name="schoolsDeanery" value={formData.schoolsDeanery} onChange={handleChange} />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Department:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Department" type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Subject Name:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Subject Name" type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Year & Semester:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Year and Semester" type="text" name="yearAndSemester" value={formData.yearAndSemester} onChange={handleChange} required />
              </div>
            </div>
            <div className='bg-gray-100 rounded border-l-8  p-3 flex flex-col justify-items-start flex-wrap items-center'>
              <h2 className='font-mono font-black text-2xl w-full border-sky-200 font-bold text-blue-500 col-span-2 text-center mb-3'>WORK DETAILS</h2>
              <div className='m-2 p-2'>
                {/* <label>No. of Sections to be handled:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Sections handled" type="number" name="sectionsHandled" value={formData.sectionsHandled} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2 flex justify-center flex-wrap'>
                {/* <label>Start Date: </label> */}
                <input className='w-80 border-l-8 border-blue-600 rounded p-3' type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>No. of Hours:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="No: of Hours" type="number" name="hours" value={formData.hours} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Proposed Rate (Per Hour):</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Proposed Rate" type="number" name="proposedRate" value={formData.proposedRate} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Total Amount:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Total Amount" type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
              </div>
            </div>
            <div className='bg-gray-100 rounded border-l-8  p-3 flex flex-col justify-items-start flex-wrap items-center'>
              <h2 className='font-mono font-black text-2xl w-full border-sky-200 font-bold text-blue-500 col-span-2 text-center mb-3'>FINANCIAL DETAILS</h2>
              <div className='m-2 p-2'>
                {/* <label>Account Number:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="A/C Number" type="text" name="accountDetails.accountNumber" value={formData.accountDetails.accountNumber} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Account Holder Name:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="A/C Holder Name" type="text" name="accountDetails.accountHolderName" value={formData.accountDetails.accountHolderName} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Bank Name:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Bank name" type="text" name="accountDetails.bankName" value={formData.accountDetails.bankName} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>Bank Branch:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Bank Branch" type="text" name="accountDetails.bankBranch" value={formData.accountDetails.bankBranch} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                {/* <label>PAN Card Number:</label> */}
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="PAN Card Number" type="text" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignupPageLect;