import React from 'react';
import { useParams } from 'react-router-dom';
import { Lecturer } from '../components/type';

const DetailsPage: React.FC<{ data: Lecturer[] }> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const lecturer = data.find(lecturer => lecturer.key.toString() === id);

  const goBack = () => {
    window.history.back();
  };

  if (!lecturer) {
    return <div>Lecturer not found!</div>;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="md:max-w-4xl w-full mx-auto bg-white shadow-lg p-8 rounded-md mt-8">
        <div className=" mb-6 bg-gray-100">
          <h1 className="text-blue-500 font-mono font-extrabold shadow-inner shadow-sky-300 text-5xl text-center font-semibold mb-4 border-solid border-2 border-blue-500 rounded-md p-5 uppercase">{lecturer.lecturerName}</h1>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div className="grid grid-cols-2 border-l-8 border-green-500 gap-2 p-3 bg-gray-100 rounded">
              <h3 className='font-mono font-black text-xl font-bold text-blue-500 col-span-2 text-center mb-3'>BASIC DETAILS</h3>
              <p className="text-xs font-extrabold md:text-base font-semibold">Phone Number</p>
              <p className="text-xs md:text-base">{lecturer.lecturerPhoneNumber}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Email</p>
              <p className="text-xs md:text-base">{lecturer.lecturerEmail}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Qualifications</p>
              <p className="text-xs md:text-base">{lecturer.lecturerQualifications}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Schools/ Deanery</p>
              <p className="text-xs md:text-base">{lecturer.lecturerSchools}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Department</p>
              <p className="text-xs md:text-base">{lecturer.lecturerDept}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Subject</p>
              <p className="text-xs md:text-base">{lecturer.lecturerSubject}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Semester/Year</p>
              <p className="text-xs md:text-base">{lecturer.lecturerSem_year}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-l-8 border-green-500 p-3 bg-gray-100 rounded">
              <h3 className='font-mono font-black text-xl font-bold text-blue-500 col-span-2 text-center mb-3'>ADDITONAL DETAILS</h3>
              <p className="text-xs font-extrabold md:text-base font-semibold">Sections handled</p> 
              <p className="text-xs md:text-base">{lecturer.lecturerClasses}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Hours</p> 
              <p className="text-xs md:text-base">{lecturer.lecturerHours}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Start Date</p>
              <p className="text-xs md:text-base">{lecturer.lecturerStartDate}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Rate</p> 
              <p className="text-xs md:text-base">{lecturer.lecturerRate}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Amount</p> 
              <p className="text-xs md:text-base">{lecturer.lecturerAmount}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Documents Uploaded</p> 
              <p className="text-xs md:text-base">{lecturer.lecturerDocs}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-l-8 border-green-500 p-3 bg-gray-100 rounded">
              <h3 className='font-mono font-black text-xl font-bold text-blue-500 col-span-2 text-center mb-3'>FINANCIAL DETAILS</h3> 
              <p className="text-xs font-extrabold md:text-base font-semibold">A/C number</p> 
              <p className="text-xs md:text-base">{lecturer.accountNumber}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">A/C holder name</p> 
              <p className="text-xs md:text-base">{lecturer.accountHolderName}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Bank name</p> 
              <p className="text-xs md:text-base">{lecturer.bankName}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Bank branch</p> 
              <p className="text-xs md:text-base">{lecturer.bankBranch}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">PAN Card number</p> 
              <p className="text-xs md:text-base">{lecturer.panCardNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-l-8 border-green-500 p-3 bg-gray-100 rounded">
              <h3 className='font-mono font-black text-xl font-bold text-blue-500 col-span-2 text-center'>APPROVAL</h3>
              <p className="text-xs font-extrabold md:text-base font-semibold">Remarks</p> 
              <p className="text-xs md:text-base">{lecturer.lecturerRemarks}</p>
              <p className="text-xs font-extrabold md:text-base font-semibold">Status</p> 
              <p className="text-xs md:text-base">{lecturer.status}</p>
            </div>
        </div>
        <button onClick={goBack} className="text-xs md:text-base mt-4 bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded">
          Back
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;

/*
1.	Name of the Faculty: 
2.	Phone:
3.	Email:
4.	Qualifications: (UG, PG, PHD)
5.	Schools/Deanery: 
6.	Department:
7.	Subject Name: 
8.	Year & Semester:
9.	No. of Sections to be handled:
10.	No of Hours:
11.	Start Date: DD/MM/YYY
12.	Proposed Rate (Per Hour):
13.	Total Amount (Auto Calculate - 7*9):
14.	Uploading Documents: (Invoice/Request Approval for Payment/ Attendance sheet)
15.	Account Details:
      a.	Account Number (14 Digit): 
      b.	Account Holder Name:
      c.	Bank Name:
      d.	Bank Branch:
16.	PAN Card Number:
17.	Remarks: 
*/
