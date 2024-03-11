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
            <p><span className="font-semibold">Phone Number:</span> {lecturer.lecturerPhoneNumber}</p>
            <p><span className="font-semibold">Email:</span> {lecturer.lecturerEmail}</p>
            <p><span className="font-semibold">Qualifications:</span> {lecturer.lecturerQualifications}</p>
            <p><span className="font-semibold">Schools:</span> {lecturer.lecturerSchools}</p>
            <p><span className="font-semibold">Department:</span> {lecturer.lecturerDept}</p>
          </div>
          <div>
            <p><span className="font-semibold">Subject:</span> {lecturer.lecturerSubject}</p>
            <p><span className="font-semibold">Semester/Year:</span> {lecturer.lecturerSem_year}</p>
            <p><span className="font-semibold">Classes:</span> {lecturer.lecturerClasses}</p>
            <p><span className="font-semibold">Hours:</span> {lecturer.lecturerHours}</p>
            <p><span className="font-semibold">Rate:</span> {lecturer.lecturerRate}</p>
            <p><span className="font-semibold">Amount:</span> {lecturer.lecturerAmount}</p>
            <p><span className="font-semibold">Remarks:</span> {lecturer.lecturerRemarks}</p>
            <p><span className="font-semibold">Status:</span> {lecturer.status}</p>
          </div>
        </div>
        <button onClick={goBack} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
