// Table.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import { Lecturer } from '../components/type';
import AddLecturerModal from '../components/AddLecturerModal';
import { useState } from 'react';
import EditModal from '../components/EditModal'; // Import the EditModal component

interface Props {
  data: Lecturer[];
  authorized?: boolean; 
}

const  Higherups: React.FC<Props> = ({ data, authorized = true }) => { 
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null); 

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddLecturer = (lecturer: Lecturer) => {
    console.log('Adding lecturer:', lecturer);
  };

  const handleEdit = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setIsEditModalOpen(true);
  };

  // Define the handleEditSubmit function to handle editing lecturer details
  const handleEditSubmit = (editedLecturer: Lecturer) => {
    // Here you can implement the logic to submit the edited lecturer details
    console.log('Edited lecturer:', editedLecturer);
    // Close the edit modal
    setIsEditModalOpen(false);
  };

  const handleAccept = (lecturerId: number) => {
    console.log('Accepted lecturer with ID:', lecturerId);
  };

  const handleComment = (lecturerId: number) => {
    console.log('Commented on lecturer with ID:', lecturerId);
  };

  return (
    <div>
      <div className="flex justify-end">
         <Link to="/logout" className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 mr-2 mt-2">Logout</Link>
      </div>
      {authorized ? (
        <div className="fixed bottom-4 right-4 flex items-center justify-end">
          <AddLecturerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddLecturer={handleAddLecturer} /> 
          <div className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer flex items-center" onClick={() => setIsModalOpen(true)}>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Lecturer
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="text-center font-bold text-3xl">Guest Lecture Details</div>
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    {authorized ? (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                      </th>
                    ) : (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((lecturer) => (
                    <tr key={lecturer.key}>
                      <td className="px-6 py-4 whitespace-nowrap">{lecturer.key}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/details/${lecturer.key}`} className="text-indigo-600 hover:text-indigo-900">
                          {lecturer.lecturerName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/details/${lecturer.key}`} className="text-indigo-600 hover:text-indigo-900">
                          {lecturer.status}
                        </Link>
                      </td>
                      {authorized ? (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 ml-2 p-2 pl-3 pr-3 bg-blue-400 text-white rounded-xl m-1" onClick={() => handleEdit(lecturer)}>
                            Edit
                          </button>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:text-blue-900 ml-2 p-2 bg-blue-400 text-white rounded-xl m-1" onClick={() => handleComment(Number(lecturer.key))}>
                            Comment
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-2 bg-green-400 text-white rounded-xl m-1" onClick={() => handleAccept(Number(lecturer.key))}>
                            Accept
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination itemsPerPage={itemsPerPage} totalItems={data.length} paginate={paginate} />
      </div>
      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} lecturer={selectedLecturer} onSubmit={handleEditSubmit} />
    </div>
  );
};

export default  Higherups;
