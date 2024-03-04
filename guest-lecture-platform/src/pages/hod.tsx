import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import { Lecturer } from '../components/type';

interface Props {
  data: Lecturer[];
  authorized?: boolean; 
}

const Table: React.FC<Props> = ({ data, authorized = true }) => { 
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-end">
         <Link to="/logout" className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 mr-2 mt-2">Logout</Link>
      </div>
      <div className="fixed bottom-4 right-4 flex items-center justify-end">
        <div className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Lecturer
        </div>
      </div>
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
                  {authorized && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit
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
                    {authorized && ( 
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
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
    </div>
  );
};

export default Table;
