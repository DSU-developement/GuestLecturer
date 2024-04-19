import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const FinancialDetailsPage: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  const storedUserData = localStorage.getItem('token');
  var email = ""; 
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    email= userData['email']; 
  } else {
    console.error('User data not found in local storage');
  }

  const [formData, setFormData] = useState({
    accountNumber: '',
    accountHolderName: '',
    bankName: '',
    bankBranch: '',
    panCardNumber: '',
    email: email, 
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleUpdateFinancialDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put('/api/updateFinancialDetails', formData);
      setSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred while updating financial details');
        }
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    }
  }, [submitted]);

  return (
    <div className='h-full flex flex-col bg-gray-100'>
      <div className="md:max-w-4xl w-full container mx-auto p-6 rounded-xl m-6 bg-white" style={{ backgroundImage: `url("./bg.jpeg")` }}>
        <div className='flex justify-center mb-4'>
          <CgProfile className='text-6xl text-blue-600' />
        </div>
        <h2 className="text-4xl mb-4 text-center font-bold">Update Financial Details</h2>
        <form onSubmit={handleUpdateFinancialDetails} className="space-y-4 p-3">
          <div className='grid grid-cols-2 gap-6'>
            <div className='bg-gray-100 rounded border-l-8 p-3'>
              <div className='m-2 p-2'>
                <input 
                  autoComplete='no' 
                  className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' 
                  placeholder="Account Number" 
                  type="text" 
                  name="accountNumber" 
                  value={formData.accountNumber} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className='m-2 p-2'>
                <input 
                  autoComplete='no' 
                  className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' 
                  placeholder="Account Holder Name" 
                  type="text" 
                  name="accountHolderName" 
                  value={formData.accountHolderName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className='m-2 p-2'>
                <input 
                  autoComplete='no' 
                  className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' 
                  placeholder="PAN Card Number" 
                  type="text" 
                  name="panCardNumber" 
                  value={formData.panCardNumber} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className='bg-gray-100 rounded border-l-8 p-3'>
              <div className='m-2 p-2'>
                <input 
                  autoComplete='no' 
                  className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' 
                  placeholder="Bank Name" 
                  type="text" 
                  name="bankName" 
                  value={formData.bankName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className='m-2 p-2'>
                <input 
                  autoComplete='no' 
                  className='w-80 border-l-8 border-blue-600 rounded p-3 outline-blue-600' 
                  placeholder="Bank Branch" 
                  type="text" 
                  name="bankBranch" 
                  value={formData.bankBranch} 
                  onChange={handleChange} 
                  required 
                />
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

export default FinancialDetailsPage;
