import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CgProfile } from 'react-icons/cg';
import Sidebar from '../../components/guestSidebar';
import Header from '../../components/guestlecHeader';

const GuestDash: React.FC = () => {
  const [lecturerData, setLecturerData] = useState<any>(null);
  const storedUserData = localStorage.getItem('token');
  var id = ""; 
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    id= userData['_id']; 

  } else {
    console.error('User data not found in local storage');
  }

  useEffect(() => {
    const fetchLecturerDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`/getLecturerDetails/${id}`);
          setLecturerData(response.data);
        } else {
          console.error('User data not found in local storage');
        }
      } catch (error) {
        console.error('Error fetching lecturer details:', error);
      }
    };

    fetchLecturerDetails();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="flex h-screen">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <div className="flex flex-col items-center mt-8 space-y-4">
      {lecturerData && (
        <>
        <div className="bg-white  rounded-lg border border-gray-300 p-8">
          <CgProfile className="fixed z-10 inset-0 overflow-y-auto" />
          <div className="text-center ">
            <h2 className="text-3xl font-bold">{lecturerData.facultyName}</h2>
            <div className="text-center grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="font-bold ml-3 text-left">Email:</div>
                <div className="text-lg  ml-3 text-left ">{lecturerData.email}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Phone:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.phone}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Schools/Deanery:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.schoolsDeanery}</div>
              </div>
              <div>
                <div className="font-bold ml-3 text-left">Department:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.department}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Subject Name:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.subjectName}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Year and Semester:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.yearAndSemester}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Sections Handled:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.sectionsHandled}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Hours:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.hours}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Start Date:</div>
                <div className="text-lg  ml-3 text-left">{new Date(lecturerData.startDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Proposed Rate:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.proposedRate}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Total Amount:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.totalAmount}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">PAN Card Number:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.panCardNumber || 'Update'}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Account Number:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.accountDetails.accountNumber|| 'Update'}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Account Holder Name:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.accountDetails.accountHolderName|| 'Update'}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Bank Name:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.accountDetails.bankName|| 'Update'}</div>
              </div>
              <div>
                <div className="font-bold  ml-3 text-left">Bank Branch:</div>
                <div className="text-lg  ml-3 text-left">{lecturerData.accountDetails.bankBranch || 'Update'}</div>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  </div>
</div>

  );
};

export default GuestDash;
