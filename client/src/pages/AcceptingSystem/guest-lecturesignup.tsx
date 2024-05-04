import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

const SignupPageLect = () => {
  const goBack = () => {
    window.history.back();
  };

  const storedUserData = localStorage.getItem('token');
  var userId = ""; 
  var deanid = "";

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
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
    proposedRate: 0,
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
  const [showRatePopup, setShowRatePopup] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setShowRatePopup(false);
    setErrorMessage('');
  
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      let proposedRate = formData.proposedRate;
  
      if (isChecked) {
        // Disable other checkboxes
        setFormData(prevState => ({
          ...prevState,
          qualifications: {
            ug: name === 'qualifications.ug' ? isChecked : false,
            pg: name === 'qualifications.pg' ? isChecked : false,
            phd: name === 'qualifications.phd' ? isChecked : false
          }
        }));
  
        if (name === 'qualifications.ug') {
          proposedRate = 800;
        } else if (name === 'qualifications.pg') {
          proposedRate = 1000;
        } else if (name === 'qualifications.phd') {
          proposedRate = 1200;
        }
      }
  
      setFormData(prevState => ({
        ...prevState,
        proposedRate: isChecked ? proposedRate : 0,
      }));
    } else if (name === "accountNumber" || name === "accountHolderName" || name === "bankName" || name === "bankBranch") {
      let parent = "accountDetails";
      let child = name;
  
      setFormData(prevState => ({
        ...prevState,
        [parent]: {
          ...(prevState[parent as keyof typeof formData] as Record<string, any>),
          [child]: value
        }
      }));
    } else if (name === 'hours') {
      const hours = parseFloat(value);
      const proposedRate = formData.proposedRate || 0;
      const totalAmount = proposedRate * hours; 
  
      setFormData(prevState => ({
        ...prevState,
        hours: value,
        totalAmount: totalAmount.toString()
      }));
    } else if (name === "proposedRate") {
      if(formData.qualifications.ug || formData.qualifications.pg || formData.qualifications.phd) {
        if(formData.qualifications.ug && parseInt(value) > 800) {
          setShowRatePopup(true);
          return;
        } else if(formData.qualifications.pg && parseInt(value) > 1000) {
          setShowRatePopup(true);
          return;
        } else if(formData.qualifications.phd && parseInt(value) > 1200) {
          setShowRatePopup(true);
          return;
        }
        
        setFormData(prevState => ({
          ...prevState,
          [name]: parseInt(value),
          remarks: {},
          approved: {}
        }));

        setShowRatePopup(false);
      } 
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        remarks: {},
        approved: {}
      }));
    }
  };
  
  
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const hashedPasswordResponse = await axios.post('https://guest-lecturer.vercel.app/api/hashPassword', { password: formData.password });
      const hashedPassword = hashedPasswordResponse.data.hashedPassword;
      const updatedFormData = { ...formData, password: hashedPassword };
      await axios.post('https://guest-lecturer.vercel.app/api/signupLecturer', updatedFormData);
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
      setTimeout(() => {
        window.location.href = '/hod';
      }, 3000);
    }
  }, [submitted]);
  return (
    <div className='h-full flex flex-col bg-gray-100'>
      <div className=" w-full container mx-auto p-6 rounded-xl m-6 bg-white" style={{ backgroundImage: `url("./bg.jpeg")` }} >
        <h2 className="text-4xl mb-4 text-center font-bold">Create a New Guest Lecturer Account </h2>
        <form onSubmit={handleSignup} className="space-y-4 p-3 border border-black bg-gray-50 rounded">
          <div className='container mx-auto  rounded-xl bg-gray-50'>
            
            <div className='border  rounded-xl bg-white  '>
              <h2 className=' font-mono font-black text-2xl w-full font-bold text-blue-500  ml-3 mt-3'>PERSONAL DETAILS</h2>
              <div className='grid grid-cols-3 gap-3 rounded  p-2 flex flex-col  flex-wrap '>
                <div className='m-1 p-1'>
                  <input autoComplete='no' className='w-80 border border-black rounded p-2 outline-blue-600' placeholder="Name" type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} required />
                </div>
                <div className='m-2 p-1'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 text-blue-700' placeholder="Phone" type="text" name='phone' value={formData.phone} onChange={handleChange} required />
                </div>
                <div className='m-2 p-1'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 text-blue-700' placeholder="Email"  type="text" name='email' value={formData.email} onChange={handleChange} required />
                </div>
                <div className='m-2 p-1'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 text-blue-700' placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
              </div> 
            </div>

            <div className='border  mt-2 rounded-xl bg-white '>
              <h2 className='font-mono font-black text-2xl w-full font-bold text-blue-500  ml-3'>ACADEMIC DETAILS</h2>
              <div className='grid grid-cols-3'>              
                <div className='grid grid-cols-3 gap-3 rounded  p-2 flex flex-col  flex-wrap'>
                <div className='m-2 p-2 '>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Schools/Deanery" type="text" name="schoolsDeanery" value={formData.schoolsDeanery} onChange={handleChange} />
                </div>
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Department" type="text" name="department" value={formData.department} onChange={handleChange} required />
                </div>
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
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Subject Name" type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Year and Semester" type="text" name="yearAndSemester" value={formData.yearAndSemester} onChange={handleChange} required />
                </div>
              </div>
            </div> 

            <div className='border  mt-2 rounded-xl bg-white'>
              <h2 className='font-mono font-black text-2xl w-full font-bold text-blue-500  ml-3'>WORK DETAILS</h2>
              <div className='grid grid-cols-3'>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Sections handled" type="number" name="sectionsHandled" value={formData.sectionsHandled} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2 flex  flex-wrap'>
                  <input className='w-80 border-black border rounded p-2 outline-blue-600 ' type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="No: of Hours" type="number" name="hours" value={formData.hours} onChange={handleChange} required />
                </div>
                <div className='ml-2 mt-0 p-2'>
                  {showRatePopup && 
                  <div className="flex flex-col justify-center text-red-500 text-xs m-0">
                    <p>Rate exceeds limits for the selected Qualification</p>
                    <p>Standard Rates: <b>UG (upto 800), PG (800-1000), PhD (1000-1200)</b></p>
                  </div>
                  }
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600' placeholder="Proposed Rate" type="number" name="proposedRate" value={formData.proposedRate} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600' placeholder="Total Amount" type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className='border  mt-2 rounded-xl bg-white'>
              <h2 className='font-mono font-black text-2xl w-full font-bold text-blue-500  ml-3'>FINANCIAL DETAILS</h2>
              <div className='grid grid-cols-3'>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Account Number" type="text" name="accountNumber" value={formData.accountDetails["accountNumber"]} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2 flex  flex-wrap'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Account Holder Name" type="text" name="accountHolderName" value={formData.accountDetails["accountHolderName"]} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Bank Name" type="text" name="bankName" value={formData.accountDetails["bankName"]} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600 ' placeholder="Bank Branch" type="text" name="bankBranch" value={formData.accountDetails["bankBranch"]} onChange={handleChange} required />
                </div>
                <div className='m-2 p-2'>
                  <input autoComplete='no' className='w-80 border-black border rounded p-2 outline-blue-600' placeholder="PAN Card Number" type="text" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} required />
                </div>
              </div>
            </div>
          </div>
          
          <div className='flex justify-between gap-6'>
            <button onClick={goBack} className="text-xs md:text-base ml-2 bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded">Back</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Submit</button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignupPageLect;