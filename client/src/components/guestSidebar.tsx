import React from 'react';
import Collegelogo from "../assets/collegelogo.png";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-62 h-full flex flex-col">
      <div className="p-4">
        <img src={Collegelogo} className="w-28 mt-2 ml-5" alt='collegelogo'/>
        <div className="flex items-center justify-center h-16 text-2xl font-bold ">
          DSU
        </div>
        <ul className="space-y-2">
          <li>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
