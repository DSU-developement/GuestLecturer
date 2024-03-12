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
      <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-md mt-8">
        <h1 className="text-3xl font-semibold mb-4">{lecturer.lecturerName}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs md:text-base"><span className="font-semibold">Phone Number:</span> {lecturer.lecturerPhoneNumber}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Email:</span> {lecturer.lecturerEmail}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Qualifications:</span> {lecturer.lecturerQualifications}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Schools/ Deanery:</span> {lecturer.lecturerSchools}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Department:</span> {lecturer.lecturerDept}</p>
          </div>
          <div>
            <p className="text-xs md:text-base"><span className="font-semibold">Subject:</span> {lecturer.lecturerSubject}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Semester/Year:</span> {lecturer.lecturerSem_year}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Sections handled:</span> {lecturer.lecturerClasses}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Hours:</span> {lecturer.lecturerHours}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Start Date:</span>NULL</p>
          </div>
          <div>
            <p className="text-xs md:text-base"><span className="font-semibold">Rate:</span> {lecturer.lecturerRate}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Amount:</span> {lecturer.lecturerAmount}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Documents Uploaded:</span>NULL</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Start Date:</span>NULL</p>
          </div>
          <div>
            <p className="text-xs md:text-base"><span className="font-semibold">A/C number:</span>NULL</p>
            <p className="text-xs md:text-base"><span className="font-semibold">A/C holder name:</span>NULL</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Bank name:</span>NULL</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Bank branch:</span>NULL</p>
          </div>
          <div>
            <p className="text-xs md:text-base"><span className="font-semibold">PAN Card number:</span>NULL</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Remarks:</span> {lecturer.lecturerRemarks}</p>
            <p className="text-xs md:text-base"><span className="font-semibold">Status:</span> {lecturer.status}</p>
          </div>
        </div>
        <button onClick={goBack} className="text-xs md:text-base mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
