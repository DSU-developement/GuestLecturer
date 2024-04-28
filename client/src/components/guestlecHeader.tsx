import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Header: React.FC = () => {
  const [lecturerData, setLecturerData] = useState<any>(null);
  const [paymentRequested, setPaymentRequested] = useState(false);
  const [accountDetailsUpdated, setAccountDetailsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };


  const handlePaymentRequest = async () => {
    try {
      // if (!accountDetailsUpdated) {
      //   setErrorMessage("Please update your account details before requesting payment.");
      //   return;
      // }

      const storedUserData = localStorage.getItem('token');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const response = await axios.put(`https://guest-lecturer.vercel.app/api/updatePaymentRequest/${userData._id}`);
        if (response.status === 200) {
          setPaymentRequested(true);
        }
      } else {
        console.error('User data not found in local storage');
      }
    } catch (error) {
      console.error('Error updating payment request:', error);
    }
  };


  useEffect(() => {
    const fetchLecturerDetails = async () => {
      try {
        const storedUserData = localStorage.getItem('token');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          const response = await axios.get(`https://guest-lecturer.vercel.app/getLecturerDetails/${userData._id}`);
          setLecturerData(response.data);
          setPaymentRequested(response.data?.PaymentRequest || false);
          setAccountDetailsUpdated(!!response.data?.accountDetails?.accountNumber);
        } else {
          console.error('User data not found in local storage');
        }
      } catch (error) {
        console.error('Error fetching lecturer details:', error);
      }
    };

    fetchLecturerDetails();
  }, []); 

  
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">DashBoard</h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 mr-2"
        >
          Logout
        </button>
        <button
          onClick={handlePaymentRequest}
          className={`text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600 ${
            paymentRequested ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
          }`}
          disabled={paymentRequested}
        >
          {paymentRequested ? 'Requested For Payment' : 'Request For Payment'}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </header>
  );
};

export default Header;
