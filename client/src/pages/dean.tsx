import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import Header from '../components/CommonHeader';

const DEAN: React.FC = () => {
  const [lectures, setLectures] = useState<any[]>([]);
  const [visibleRows, setVisibleRows] = useState(5); // Number of rows to display initially
  const tableRef = useRef<HTMLDivElement>(null);

  const storedUserData = localStorage.getItem('token');
  var userId = "";

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    console.log(userData);
    userId = userData['_id'];
    console.log(userId);
  } else {
    console.error('User data not found in local storage');
  }

  useEffect(() => {
    async function fetchLectures() {
      try {
        const response = await axios.get(`/lecture/dean/${userId}`);
        console.log(response.data);
        setLectures(response.data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    }

    fetchLectures();
  }, []);

  const handleAccept = async (lecturerId: string) => {
    try {
      await axios.put(`/lecture/accept/${lecturerId}`);
      // Optionally, you can update your local state or perform any other actions after accepting the lecturer
      window.location.reload(); // Reload the page after accepting the lecturer
    } catch (error) {
      console.error('Error accepting lecturer:', error);
    }
  };

  const handleComment = async (lecturer: any) => {
    try {
      // Handle the comment action here
    } catch (error) {
      console.error('Error commenting on lecturer:', error);
    }
  };

  const handleScroll = () => {
    const element = tableRef.current;
    if (element) {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (scrolledToBottom && visibleRows < lectures.length) {
        setVisibleRows(prev => Math.min(prev + 5, lectures.length)); // Increase visible rows until all rows are visible
      }
    }
  };

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
                  {lectures.slice(0, visibleRows).map((lecturer, index) => (
                    <tr key={lecturer._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/details/${lecturer._id}`} className="text-indigo-600 hover:text-indigo-900">{lecturer.facultyName}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/details/${lecturer._id}`} className="text-indigo-600 hover:text-indigo-900">{lecturer.status}</Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`text-green-600 hover:text-green-900 ml-2 p-2 pl-3 pr-3 ${
                          lecturer.approved.dean ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-400 text-white hover:bg-green-500'
                        } rounded-xl m-1`}
                        onClick={() => handleAccept(lecturer._id)}
                        disabled={lecturer.approved.dean}
                          >
                        {lecturer.approved.dean ? 'Accepted' : 'Accept'}
                        </button>
                        <button
                          className={`text-blue-600 hover:text-blue-900 ml-2 p-2 pl-3 pr-3 ${
                            lecturer.approved.dean ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-400 text-white hover:bg-blue-500'
                          } rounded-xl m-1`}
                          onClick={() => handleComment(lecturer._id)}
                          disabled={lecturer.approved.dean}
                        >
                          {lecturer.approved.dean ? 'Comment' : 'Comment'}
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
      </div>
    </div>
  );
};

export default DEAN;
