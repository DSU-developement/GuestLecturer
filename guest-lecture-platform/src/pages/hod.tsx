import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import { Lecturer } from '../components/type';

interface Props {
  data: Lecturer[];
  authorized?: boolean; // Make authorized prop optional
}

const Table: React.FC<Props> = ({ data, authorized = true }) => { // Default to true if not provided
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
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
                  {authorized && ( // Render the "Edit" column if authorized
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
                    {authorized && ( // Conditionally render the "Edit" button
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
  );
};

export default Table;
