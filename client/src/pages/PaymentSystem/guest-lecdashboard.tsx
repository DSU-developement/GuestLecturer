import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/guestSidebar';
import Header from '../../components/guestlecHeader';


const GuestDash: React.FC = () => {
  const [lecturerData, setLecturerData] = useState<any>(null);
  const storedUserData = localStorage.getItem('token');
  var id = "";
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    id = userData['_id']; 

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
  }, []);

  const getStatus = (lecturer: any) => {
    // Check if all approvals are true
    const allApproved = Object.values(lecturer.paymentapproved).every((approval: any) => approval as boolean);
    return allApproved ? 'Accepted' : 'Pending';
  }

  return (
    <div className="flex h-screen">
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <div className="flex flex-col items-center mt-8 space-y-4">
      {lecturerData && (
        <>
        <div className="container mx-auto px-2 p-3 ml-1.5 mr-1">
          <div className="bg-white  rounded-lg borderp-8">
            <div className="text">
              <h2 className="text-3xl font-bold text-blue-500 mb-5"> Welcome {lecturerData.facultyName}!</h2>

              <div className="text-center grid grid-cols-3 gap-10 mt-4 mb-2 ">
                <div>
                  <div className="font-bold ml-2 text-left">Email:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.email}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Phone:</div>
                  <div className="  bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.phone}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">PAN Card Number:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.panCardNumber || 'Update'}</div>
                </div>  
              </div>

              <div className="w-full bg-gray-100 border-t border-gray-300 my-8"></div>

              <div className='text-center grid grid-cols-3 gap-10 mt-4 mb-2'>
                <div>
                  <div className="font-bold  ml-2 text-left">Schools/Deanery:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.schoolsDeanery}</div>
                </div>
                <div>
                  <div className="font-bold ml-2 text-left">Department:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.department}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Subject Name:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.subjectName}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Year and Semester:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.yearAndSemester}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Sections Handled:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.sectionsHandled}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Hours:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.hours}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Start Date:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{new Date(lecturerData.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Proposed Rate:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.proposedRate}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Total Amount:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.totalAmount}</div>
                </div>
              </div>

              <div className="w-full bg-gray-100 border-t border-gray-300 my-8"></div>

              <div className="text- left grid grid-cols-4 gap-10 mt-4 mb-2">
                <div>
                  <div className="font-bold  ml-2 text-left">Account Number:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.accountDetails.accountNumber}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Account Holder Name:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.accountDetails.accountHolderName}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Bank Name:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.accountDetails.bankName}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Bank Branch:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.accountDetails.bankBranch}</div>
                </div>
              </div>

              <div className="w-full bg-gray-100 border-t border-gray-300 my-8"></div>

              <div className="text- left grid grid-cols-2 gap-10 mt-4 mb-2">
                <div>
                  <div className="font-bold  ml-2 text-left">Approval status:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{lecturerData.Accepted ? "Accepted" : "Pending"}</div>
                </div>
                <div>
                  <div className="font-bold  ml-2 text-left">Payment Status:</div>
                  <div className=" bg-blue-50 mt-1 border border-black-300 text-lg  ml-2 text-left p-1">{getStatus(lecturerData)}</div>
                </div>
              </div>

              </div>
          </div>
          </div>
        </>
      )};
    </div>
  </div>
</div>

  );
};

export default GuestDash;
