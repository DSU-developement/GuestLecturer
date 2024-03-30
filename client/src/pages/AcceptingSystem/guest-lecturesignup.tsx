import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const SignupPageLect = () => {
  const goBack = () => {
    window.history.back();
  };

  const storedUserData = localStorage.getItem('token');
  var userId = ""; 
  var deanid = "";
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    console.log(userData);
    userId = userData['_id']; 
    deanid = userData['deanId'];

  } else {
    console.error('User data not found in local storage');
  }
  const [formData, setFormData] = useState({
    facultyName: '',
    phone: '',
    email: '',
    password: '',
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
    remarks: {},
    approved:{},
    hod_id: userId,
    dean_id: deanid,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
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
        [name]: value,
        remarks:{},approved:{},
      });
    }
  };
  
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      await axios.post('/api/signupLecturer', formData);
      setSubmitted(true);
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
  useEffect(() => {
    if (submitted) {
      // Redirect to /hod
      setTimeout(() => {
        window.location.href = '/hod';
      }, 3000); // Redirect after 3 seconds
    }
  }, [submitted]);
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
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Name" type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Phone" type="text" name='phone' value={formData.phone} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Email"  type="text" name='email' value={formData.email} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
            </div>
            <div className='bg-gray-100 rounded border-l-8  p-3 flex flex-col justify-items-start flex-wrap items-center'>
              <h2 className='font-mono font-black text-2xl w-full border-sky-200 font-bold text-blue-500 col-span-2 text-center mb-3'>ACADEMIC DETAILS</h2>
              <div className='p-2 flex flex-col'>
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
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Schools/Deanery" type="text" name="schoolsDeanery" value={formData.schoolsDeanery} onChange={handleChange} />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Department" type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Subject Name" type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Year and Semester" type="text" name="yearAndSemester" value={formData.yearAndSemester} onChange={handleChange} required />
              </div>
            </div>
            <div className='bg-gray-100 rounded border-l-8  p-3 flex flex-col justify-items-start flex-wrap items-center'>
              <h2 className='font-mono font-black text-2xl w-full border-sky-200 font-bold text-blue-500 col-span-2 text-center mb-3'>WORK DETAILS</h2>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Sections handled" type="number" name="sectionsHandled" value={formData.sectionsHandled} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2 flex justify-center flex-wrap'>
                <input className='w-80 border-l-8 border-blue-600 rounded p-3' type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="No: of Hours" type="number" name="hours" value={formData.hours} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Proposed Rate" type="number" name="proposedRate" value={formData.proposedRate} onChange={handleChange} required />
              </div>
              <div className='m-2 p-2'>
                <input autoComplete='no' className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' placeholder="Total Amount" type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            <button onClick={goBack} className="text-xs md:text-base ml-2 bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded">
          Back
        </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      
    </div>
  );
};

export default SignupPageLect;