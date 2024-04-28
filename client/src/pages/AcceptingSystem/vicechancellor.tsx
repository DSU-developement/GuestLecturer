import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../../components/SideBar';
import Header from '../../components/CommonHeader';
import DetailsModal from '../../components/DetailsModal';
import CommentModal from '../../components/CommentModal';

const ViceChancellor: React.FC = () => {
  const [approvedLecturers, setApprovedLecturers] = useState<any[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLecturerForDetails, setSelectedLecturerForDetails] = useState<any | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedLecturerId, setSelectedLecturerId] = useState('');
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchApprovedLecturers() {
      try {
        const response = await axios.get('https://guest-lecturer.vercel.app/vicechancellor/approved-lectures');
        setApprovedLecturers(response.data);
      } catch (error) {
        console.error('Error fetching approved lectures:', error);
      }
    }

    fetchApprovedLecturers();
  }, []);

  const handleAccept = async (lecturerId: string) => {
    try {
      await axios.put(`https://guest-lecturer.vercel.app/lecture/accept/vicechancellor/${lecturerId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error accepting lecturer:', error);
    }
  };

  const handleComment = async (lecturer: any) => {
    try {
      setSelectedLecturerId(lecturer);
      setIsCommentModalOpen(true);
    } catch (error) {
      console.error('Error commenting on lecturer:', error);
    }
  };
  

  const handleDetails = (lecturer: any) => {
    setSelectedLecturerForDetails(lecturer);
    setIsDetailsModalOpen(true);
  };

  const getStatus = (lecturer: any) => {
    // Check if all approvals are true
    const allApproved = Object.values(lecturer.approved).every((approval: any) => approval as boolean);
    return allApproved ? 'Accepted' : 'Pending';
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div
          className="overflow-auto mt-5"
          style={{ height: 'calc(100vh - 200px)' }} 
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
                  {approvedLecturers.map((lecturer, index) => (
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
                          className={`text-green-600 hover:text-green-900 ml-2 p-2 pl-3 pr-3 ${
                            lecturer.approved.viceChancellor ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-400 text-white hover:bg-green-500'
                          } rounded-xl m-1`}
                          onClick={() => handleAccept(lecturer._id)}
                          disabled={lecturer.approved.viceChancellor}
                        >
                          {lecturer.approved.viceChancellor ? 'Accepted' : 'Accept'}
                        </button>
                        <button
                          className={`text-blue-600 hover:text-blue-900 ml-2 p-2 pl-3 pr-3 ${
                            lecturer.approved.viceChancellor ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-400 text-white hover:bg-blue-500'
                          } rounded-xl m-1`}
                          onClick={() => handleComment(lecturer._id)}
                          disabled={lecturer.approved.viceChancellor}
                        >
                          Comment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute top-0 right-0 bg-gray-200 w-2 bottom-0" style={{ zIndex: 10 }} />
        </div>
      </div>
      <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          lecturer={selectedLecturerForDetails}
        />
        <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        lecturerId={selectedLecturerId}
      />
    </div>
  );
};

export default ViceChancellor;
