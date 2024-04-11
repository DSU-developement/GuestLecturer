import React from 'react';
import { Link } from 'react-router-dom';
import Collegelogo from "../assets/collegelogo.png";

const Sidebar: React.FC = () => {

  const storedUserData = localStorage.getItem('role');
  var role = ""; 
  if (storedUserData) {
    role = JSON.parse(storedUserData);
  } else {
    console.error('User role not found in local storage');
  }


  let acceptPath='/hod';
  if (role === 'Dean') {
    acceptPath='/dean'
  }
  else if (role === 'Registrar'){
    acceptPath='/registar'
  }
  else if (role === 'ViceChancellor'){
    acceptPath='/vicechancellor'
  }
  else if (role === 'HR'){
    acceptPath='/vphr'
  }
  else if (role === 'ProChancellor'){
    acceptPath='/prochancellor'
  }
  else if (role === 'CFO'){
    acceptPath='/cfo'
  }

  // Define the default payment path
  let paymentPath = '/Payment';

  // Change payment path based on the role
  if(role ==='HOD'){
    paymentPath = '/hodPayment';
  }
  
  
  return (
    <div className="bg-gray-800 text-white w-62 h-screen flex flex-col">
      <div className="p-4">
        <img src={Collegelogo} className="w-28 mt-2 ml-5" alt='collegelogo'/>
        <div className="flex items-center justify-center h-16 text-2xl font-bold ">
          DSU
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to={acceptPath}
              className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Accept Guest Lecture
            </Link>
            <Link
              to={paymentPath} // Use the dynamic payment path
              className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Accept Payment
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
