import React, { useEffect, useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa'; // Importing delete icon
import EditModal from '../../components/EditModal';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Header from '../../components/HeaderHod';
import DetailsModal from '../../components/DetailsModal';

const Table: React.FC = () => {
  const [lecturers, setLecturers] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<any | null>(null);
  const [selectedLecturerDetails, setSelectedLecturerDetails] = useState<any | null>(null);
  const [visibleRows, setVisibleRows] = useState(5);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLecturerForDetails, setSelectedLecturerForDetails] = useState<any | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const storedUserData = localStorage.getItem('token');
  var userId = "";
  var Role = localStorage.getItem('role');
  var role;
  if(Role){
    var role = JSON.parse(Role)
  }
  if(role==='GuestLecture'){
    console.log(true);
  }
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userId = userData['_id'];
  } else {
    console.error('User data not found in local storage');
  }



  useEffect(() => {
    async function fetchLecturers() {
      try {
        const response = await axios.get(`https://guest-lecturer.vercel.app/lecture/${userId}`);
        setLecturers(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    }

    fetchLecturers();
  }, []);

  const handleEdit = (lecturer: any) => {
    setSelectedLecturer(lecturer);
    setSelectedLecturerDetails(lecturer);
    setIsEditModalOpen(true);
  };

  const handleDetails = (lecturer: any) => {
    setSelectedLecturerForDetails(lecturer);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = async (lecturerId: string) => {
    try {
      await axios.delete(`https://guest-lecturer.vercel.app/lecture/${lecturerId}`);
      setLecturers(prevState => prevState.filter(lecturer => lecturer._id !== lecturerId));
    } catch (error) {
      console.error('Error deleting lecturer:', error);
    }
  };

  const handleEditSubmit = (editedLecturer: any) => {
    console.log('Edited lecturer:', editedLecturer);
    setIsEditModalOpen(false);
  };

  const handleScroll = () => {
    const element = tableRef.current;
    if (element) {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom && visibleRows < lecturers.length) {
        setVisibleRows(prev => Math.min(prev + 5, lecturers.length));
      }
    }
  };


  const getStatus = (lecturer: any) => {
    // Check if all approvals are true
    const allApproved = Object.values(lecturer.approved).every((approval: any) => approval as boolean);
    return allApproved ? 'Accepted' : 'Pending';
  };

  if (role !== 'HOD') {
    return <div className='text-6xl font-bold ml-20 mr-20 mt-10'>You are not authorized to view this page.</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div
          className="overflow-auto mt-5"
          style={{ height: 'calc(100vh - 200px)' }} 
          onScroll={handleScroll}
          ref={tableRef}
        >
          <div className="m-3">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lecturers.slice(0, visibleRows).map((lecturer, index) => (
                    <tr key={lecturer._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleDetails(lecturer)}
                        >
                          {lecturer.facultyName}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatus(lecturer)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            className="text-blue-600 hover:text-blue-900 ml-2 p-2 pl-3 pr-3 bg-blue-400 text-white rounded-xl m-1" 
                            onClick={() => handleEdit(lecturer)}
                          >
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 ml-2 p-2 pl-3 pr-3 bg-red-400 text-white rounded-xl m-1" 
                            onClick={() => handleDelete(lecturer._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Scrollbar */}
          <div className="absolute top-0 right-0 bg-gray-200 w-2 bottom-0" style={{ zIndex: 10 }} />
        </div>
        {selectedLecturerDetails && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            lecturer={selectedLecturerDetails}
            onSubmit={handleEditSubmit}
          />
        )}
        <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          lecturer={selectedLecturerForDetails}
        />
      </div>
    </div>
  );
};

export default Table;
