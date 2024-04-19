import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">GUEST FACULTY HONORARIUM INITIATION</h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 mr-2"
        >
          Logout
        </button>
        <Link
          to="/add-lecture"
          className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Lecturer
        </Link>
      </div>
    </header>
  );
};

export default Header;
