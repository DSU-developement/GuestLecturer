import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-center h-16 text-2xl font-bold">
          DSU
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/add-guest-lecture"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Add Guest Lecture
            </Link>
          </li>
          <li>
            <Link
              to="/accept-payments"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Accept Payments
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
